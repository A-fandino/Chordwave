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
      <section className='col-span-3'><Song/></section>
      <section className='w-full h-full flex items-center'><Chat/></section>
    </main>)
}
