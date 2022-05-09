import React from 'react'
import { Link } from "react-router-dom"
import Nav from "@/Layout/Nav"

export default function Profile() {
  return (
    <main className="flex flex-col gap-4 h-screen text-white">
        <Nav/>
        <div className="h-full p-4 flex flex-col gap-72">
            <section className="h-full p-4 grid grid-cols-3 gap-6 auto-rows-min">
                {
                    [1,2,3,4,5,6,7,8].map(i => {
                    return <div className='bg-gray-900 rounded flex flex-col p-4 justify-between'>
                        <section className="room-info flex flex-col">
                            <h2 className="text-xl font-bold">Room {i}</h2>
                            <h5 className="text-sm text-gray-500 italic">Created by: Arnaldo</h5>
                            <span>0/5</span>
                        </section>
                        <Link to="/" className="px-8 py-2 bg-indigo-500 text-white font-bold self-end rounded hover:bg-indigo-800">Join</Link>
                    </div>
                    })
                }
            </section>
        </div>
    </main>
  )
}
