import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '@/context'
import { useParams } from 'react-router-dom'

export default function Chat() {
    const {id} = useParams()
    const msgBoxRef = useRef(null)
    const [msgs, setMsgs] = useState([])
    const [currentMsg, setCurrentMsg] = useState("")
    const { socket, user }  = useGlobalContext()

    
    const generateMessage = (msg, key) => {
        const classes = "bg-gray-700 px-4 py-2 rounded max-w-[75%] break-all"
        const self = msg.user == user.nickname
        const msgByType = {
            "join": (data) => <span key={data.key} className={`${classes} bg-green-400 self-center`}>{msg.user} joined!</span>,
            "leave": (data) => <span key={data.key} className={`${classes} bg-red-400 self-center`}>{msg.user} left!</span>,
            "message": (data) => (
            <span key={data.key} className={`${classes} ${self ? "self-end" : "self-start"} flex gap-2`}>
                 {self ? "" : <Link to={`/profile/${msg.user}`} className="text-indigo-500 break-normal self-end hover:text-indigo-400 hover:underline">{msg.user}</Link> }
                {msg.msg}
            </span>)
        }

        return msgByType[msg.type]({key, ...msg})
    }
    function addMsg(data) {
            console.log(data)
            setMsgs((m) => [...m,data])
    }
    useEffect(() => {
        socket.off("user_join").on("user_join", addMsg)
        socket.off("user_leave").on("user_leave", addMsg)
        socket.off("chat message").on("chat message", addMsg)
    },[])
      

  return (
    <div className='chat-box bg-gray-900 rounded-t-md h-full max-h-[85vh] w-9/12 pt-4'>
        <section ref={msgBoxRef} className='chat-message-box text-md flex flex-col gap-4 text-white h-full p-4 pb-0 overflow-scroll'>
            <span className='w-full p-2 text-center text-indigo-500 font-bold rounded'>Welcome to the chat!</span>
            {msgs.map((msg,key) => generateMessage(msg,key))}
        </section>
        <form className="chat-control-box w-full bg-gray-900 flex items-stretch rounded-b-md p-3" onSubmit={(e) => {
                e.preventDefault()
                if (!currentMsg) return
                socket.emit("chat message", {msg: currentMsg, room:id}, () => {
                    msgBoxRef.current.scrollTop = msgBoxRef.current.scrollHeight
                })
                setCurrentMsg("")
            }}>
            <input type="text" style={{textAlign:"left"}} className='basic black text-left w-full px-4' value={currentMsg} onChange={e => setCurrentMsg(e.target.value)} placeholder="Message"/>
        </form>
    </div>
  )
}
