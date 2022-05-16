import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom"
import Nav from "@/Layout/Nav"

export default function Rooms() {

    const [rooms, setRooms] = useState([])

    useEffect(() => {
        (async function () {
            const resp = await fetch("http://localhost:5000/api/get-rooms")
            const data = await resp.json()
            setRooms(data)
        })()
    },[])

  return (
    <main className="flex flex-col gap-4 h-screen text-white">
        <Nav/>
        <div className="h-full p-4 flex flex-col gap-72">
            <section className="h-full p-4 grid grid-cols-3 gap-6 auto-rows-min">
                {
                    rooms.map((r, i) => {
                    return <div key={i} className='bg-gray-900 rounded flex flex-col p-4 justify-between'>
                        <section className="room-info flex flex-col">
                            <h2 className="text-xl font-bold">{r.admin_name}'s Room</h2>
                            <Link to={`/profile/${r.admin_name}`} className="text-sm text-gray-500 hover:text-gray-600 italic">Created by: {r.admin_name}</Link>
                            <span>{r.users}/{r.max_users}</span>
                        </section>
                        {
                        r.users < r.max_users ?
                        <Link to={`/rooms/song/${r.admin_name}`} className="px-8 py-2 bg-indigo-500 text-white font-bold self-end rounded hover:bg-indigo-800">Join</Link>
                        : <span className="self-end font-bold text-gray-500">Complete</span>
                        }
                    </div>
                    })
                }
            </section>
        </div>
    </main>
  )
}
