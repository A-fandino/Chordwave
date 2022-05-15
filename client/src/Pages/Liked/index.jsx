import React, { useEffect, useState } from 'react'
import SongMiniature from '@/Components/SongMiniature'
import Nav from "@/Layout/Nav"

export default function Liked() {

    const [songs, setSongsData] = useState([])

    async function getSongs() {
        const resp = await fetch("http://localhost:5000/api/liked", {mode:"cors", credentials:"include"})
        setSongsData(await resp.json())
    }

    useEffect(() => {
        getSongs()
    },[])

  return (
    <main className="flex flex-col gap-4 w-full">
        <Nav/>
        <h1 className="text-5xl p-8 pb-0 text-white font-bold">Your Likes</h1>
        <section className="flex flex-wrap gap-4 p-8">
            {
                songs.map(song => <SongMiniature data={song}/>)
            }
        </section>
    </main>
    )
}