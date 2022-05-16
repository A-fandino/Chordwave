import React, {useEffect, useState} from 'react'
import Loading from '@/Components/Loading'
import Nav from '@/Layout/Nav'
import { useGlobalContext } from '@/context'
import { useParams } from 'react-router-dom'


export default function SongRoom() {
    const { socket } = useGlobalContext()
    const {id} = useParams()
    const [loading, setLoading] = useState(true)
    const [msgs, setMsgs] = useState([])

    useEffect(() => {
        if(!socket.connected) socket.connect()
        socket.emit("join",{room:id}, () => {
          setLoading(false)
        })
        socket.off("user_join").on("user_join", async (data) => {
          console.log(data)
          setMsgs((m) => [...m,data])
          return 0
        })
        return () => socket.close()
    },[])

  return loading ? <Loading show={loading} setShow={setLoading}/> : (
    <main className="flex flex-col gap-4">
      <Nav/>
      <div className='text-xl h-screen flex flex-col gap-4 text-white'>
        {msgs.map((m) => <span>{m}</span>)}
      </div>
    </main>
  )
}
