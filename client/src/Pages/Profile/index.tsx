import React from 'react'
import { Link } from "react-router-dom"
import Nav from "@/Layout/Nav"
import PFP from "@/static/img/default.jpg"
import {useGlobalContext} from "@/context"
import { MusicNoteIcon } from "@heroicons/react/solid"

export default function Profile() {
    const {user} = useGlobalContext()
  return (
    <main className="flex flex-col gap-4 h-screen text-white">
        <Nav/>
        <div className="h-full p-4 flex flex-col gap-72">
            <section className="w-full h-80 relative flex justify-center p-4 md:block flex flex-col gap-4 items-center">
                <article className="profile-pic-container w-80 static md:absolute border border-[16px] border-violet-700 aspect-square bg-gray-500 rounded-full z-10 overflow-hidden">
                <picture>
                    <img src={PFP} />
                </picture>
                </article>
                <article className="profile-info-container h-56 static md:absolute md:left-4 md:right-4 rounded-full bg-violet-700 px-16 md:pl-80 py-4 top-16 z-0 flex flex-col items-center justify-center text-center">
                    <h1 className="text-3xl font-bold">{user.nickname}</h1>
                    <h5 className="text-sm text-gray-400 italic">Enjoying since {user.pretty_date}</h5>
                </article>
            </section>

            <section>
                <h2 className="text-2xl font-bold p-4 underlines">Songs</h2>
                <div className="w-full flex flex-wrap gap-16 justify-evenly">
                    {
                        [1,2,3,4].map(i => {
                            return (
                            <article className="bg-gray-300 bg-gray-700 rounded w-56">
                                <div className="w-full aspect-square p-8"><MusicNoteIcon/></div>
                                <h2 className="p-4 text-lg font-bold w-full">Title</h2>
                            </article>
                            )
                        })
                    }
                </div>
            </section>
            
            <section>
                <a href="http://localhost:5000/auth/logout" className="p-4 bg-red-500 rounded font-bold text-white">Logout</a>
            </section>

        </div>
    </main>
  )
}
