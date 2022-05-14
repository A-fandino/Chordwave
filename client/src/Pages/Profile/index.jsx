import React, {useEffect, useState} from 'react'
import Nav from "@/Layout/Nav"
import SongMiniature from "@/Components/SongMiniature"
import PFP from "@/static/img/default.jpg"
import {useGlobalContext} from "@/context"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const params = useParams()
    const {user} = useGlobalContext()
    
    const [userData, setUserData] = useState(user)
    const [userSongs, setUserSongs] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        (async function() {
            if (params.nickname)
            {
                try {
                    const respUser = await fetch("http://localhost:5000/auth/check/"+params.nickname)
                    const data = await respUser.json()
                    setUserData(data)
                } catch {
                    return navigate('/profile')
                }
            }
        })()
    },[])

    useEffect(() => {
        (async function() {
            const respSong = await fetch("http://localhost:5000/api/userSongs/"+userData.nickname)
            const songs = await respSong.json()
            setUserSongs(songs)
        })()
    }, [userData])

  return (
    <main className="flex flex-col gap-4 h-screen text-white">
        <Nav/>
        <div className="h-full p-4 flex flex-col gap-72">
            <section className="w-full h-80 relative p-4 flex justify-center p-4 md:block flex flex-col gap-4 items-center">
                <article className="profile-pic-container w-80 static md:absolute border border-[16px] border-violet-700 aspect-square bg-gray-500 rounded-full z-10 overflow-hidden">
                <picture>
                    <img src={PFP} />
                </picture>
                </article>
                <article className="profile-info-container h-56 static md:absolute md:left-4 md:right-4 rounded-full bg-violet-700 px-16 md:pl-80 py-4 top-16 z-0 flex flex-col items-center justify-center text-center gap-2">
                    <h1 className="text-5xl font-bold">{userData.nickname}</h1>
                    <h5 className="text-sm text-gray-400 italic">Enjoying since {userData.pretty_date}</h5>
                </article>
            </section>

            <section>
                <h2 className="text-2xl font-bold p-4 underlines">Songs</h2>
                <div className="w-full flex flex-wrap gap-8 justify-center">
                    {
                        userSongs.map(song => <SongMiniature data={song}/>)
                    }
                </div>
            </section>
            
            <section className="p-4 mb-4">
                <a href="http://localhost:5000/auth/logout" className="p-4 bg-red-500 rounded font-bold text-white">Logout</a>
            </section>

        </div>
    </main>
  )
}
