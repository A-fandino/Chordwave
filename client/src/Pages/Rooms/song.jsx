import React, {useEffect, useState} from 'react'
import Loading from '@/Components/Loading'
import Chat from '@/Components/Chat'
import Song from '@/Pages/Song'
import { useParams, Link, Navigate, useNavigate } from "react-router-dom"
import { useGlobalContext } from '@/context'

export default function SongRoom() {
  const params = useParams()
  const {id} = params
  const [loading, setLoading] = useState(true)
  
  const { socket } = useGlobalContext()
    useEffect(() => {
        if (socket.disconnected) socket.connect()
        socket.emit("join",{room:id}, () => {
          setLoading(false)
          socket.emit("song",{room:id}, data => console.log(data))
        })
      socket.on("song", (data) => console.log(data))
        return () => {
        socket.emit("leave", {room:id})
      }
    },[])

  return loading ? <Loading show={loading} setShow={setLoading}/> : (
    <main className="w-full h-screen grid grid-cols-4">
      <section className='lg:col-span-3 col-span-2'><Song/></section>
      <section className='w-full min-w-[20rem] h-full flex items-center lg:col-span-1 col-span-2'><Chat/></section>
    </main>)
}
