import React, {useEffect, useState} from 'react'
import Loading from '@/Components/Loading'
import Nav from '@/Layout/Nav'
import Chat from '@/Components/Chat'
import { useGlobalContext } from '@/context'
import { useParams } from 'react-router-dom'

export default function SongRoom() {
  const {id} = useParams()
  const [loading, setLoading] = useState(true)
  
  const { socket } = useGlobalContext()
    useEffect(() => {
        console.log(1)
        socket.emit("join",{room:id}, () => {
        console.log(2)
          setLoading(false)
        })
      return () => {
        socket.emit("leave", {room:id})
      }
    },[])

  return loading ? <Loading show={loading} setShow={setLoading}/> : (
    <main className="flex flex-col gap-4">
      <Nav/>
      <Chat/>
    </main>
  )
}
