import React, { useEffect, useState } from 'react'
import SongMiniature from '@/Components/SongMiniature'
import Nav from "@/Layout/Nav"
import { useParams } from 'react-router-dom'

export default function Playlist() {
    const params = useParams()
    const [songs, setSongsData] = useState([])

    async function getSongs() {
        const resp = await fetch(`http://localhost:5000/api/playlist-songs/${params.user}/${params.name}`)
        setSongsData(await resp.json())
    }

    useEffect(() => {
        getSongs()
    },[])

  return (
    <main className="flex flex-col gap-4 w-full">
        <Nav/>
        <h1 className="text-5xl p-8 pb-0 text-white font-bold">{params.name} - {params.user}</h1>
        { songs.length ?
        <section className="flex flex-wrap gap-4 p-8">
            {
                songs.map(song => <SongMiniature data={song}/>)
            }
        </section>
        :
        <span className='text-5xl text-white text-gray-300 text-center w-full font-bold italic h-full flex justify-center items-center h-96'>Playlist is empty</span>
        }
    </main>
    )
}