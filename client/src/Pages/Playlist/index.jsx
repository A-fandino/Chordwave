import React, { useEffect, useState } from 'react'
import SongMiniature from '@/Components/SongMiniature'
import SelectSong from '@/Components/SelectSong'
import Nav from "@/Layout/Nav"
import { PlusIcon } from '@heroicons/react/outline'
import { useParams } from 'react-router-dom'
import { useGlobalContext } from '@/context'

export default function Playlist() {
    const { user } = useGlobalContext()
    const params = useParams()
    const [songs, setSongs] = useState([])
    const [showSelector, setShowSelector] = useState(false)

    async function getSongs() {
        const resp = await fetch(`http://localhost:5000/api/playlist-songs/${params.user}/${params.name}`, {credentials:"include"})
        setSongs(await resp.json())
        console.log(songs)
    }

    useEffect(() => {
        getSongs()
    },[])

  return (
    <main className="flex flex-col gap-4 w-full">
        <Nav/>
        <h1 className="text-5xl p-8 pb-0 text-white font-bold">{params.name} - {params.user}</h1>
        <div className="w-full flex justify-center">
        {user.nickname == params.user ?
            <button className='p-4 py-2 bg-indigo-500 font-bold rounded text-white flex items-center gap-2 hover:bg-indigo-600' onClick={() => setShowSelector(true)}> 
                    <PlusIcon className='h-6'/> Add Song
            </button> 
        : ""
        }
        </div>
        { songs.length ?
        <section className="flex flex-wrap gap-4 p-8">
            {
                songs.map(song => <SongMiniature data={song}/>)
            }
        </section>
        :
        <span className='text-5xl text-white text-gray-300 text-center w-full font-bold italic h-full flex justify-center items-center h-96'>Playlist is empty</span>
        }
        {showSelector && user.nickname == params.user ? <SelectSong show={showSelector} setShow={setShowSelector} selected={songs} setSelected={setSongs}/> : ""}
    </main>
    )
}