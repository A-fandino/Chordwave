import React, { useEffect, useRef, useState } from 'react'
import { useParams, Link, Navigate, useNavigate } from "react-router-dom"
import Nav from "@/Layout/Nav/"
import { PlayIcon, StopIcon, RewindIcon, FastForwardIcon, MusicNoteIcon, PauseIcon } from "@heroicons/react/solid"
import { Waveform } from '@uiball/loaders'

import { useGlobalContext } from '@/context'

export default function Song() {
    const params = useParams()
    const [songData, setSongData] = useState({author:params.author, name:params.name})
    const [play, setPlay] = useState(true)
    const audioRef = useRef(null)

    const navigate = useNavigate()
    const { socket } = useGlobalContext()


    const getSongData = async () => {
        const resp = await fetch(`http://localhost:5000/api/song/${params.author}/${params.name}`)
        const data = await resp.json()
        setSongData(data)
    }

    useEffect(() => {
        getSongData()
    },[])

    useEffect(() => {
        play && audioRef.current.play()
    }, [songData])

    function togglePlay() {
        setPlay(!play)
        if (play) {
            audioRef.current.pause()
            return
        }
        audioRef.current.play()
    }

    async function previousSong() {
        navigate(-1)
    }
    async function nextSong() {
        const resp = await fetch("http://localhost:5000/api/random-song")
        const data = await resp.json()
        navigate(`/song/${data[0].author}/${data[0].name}`)
    }

    return (
        <>
            <main className="flex flex-col gap-4 h-screen text-white">
                <Nav />
                <section className="grid grid-cols-2 gap-4 p-4 justify-items-center">
                    <article className={`music-disc w-[27rem] sm:p-24 sm:w-[25rem] ${play ? "animate-spin-slow amber"  : ""}`}>
                        { play ? <Waveform 
                        size={120}
                        lineWeight={18}
                        speed={.8} 
                        color={"#fbbf24"}
                        /> 
                        : <MusicNoteIcon/>}
                    </article>
                    <article className='w-full p-4 text-left flex flex-col gap-2'>
                        <h1 className="text-5xl font-bold">{params.name}</h1>
                        <Link to={`/profile/${params.author}`} className="text-3xl text-gray-500 italic font-serif pl-4 hover:text-gray-400"> “{params.author}”</Link>
                    </article>
                </section>
                <section className='bg-gray-900 p-3 mx-10 flex items-center justify-center gap-16'>
                    <span className="song-control" onClick={previousSong}><RewindIcon/></span>
                    <span className="song-control" onClick={togglePlay}>
                        {
                         play ?  <PauseIcon/> : <PlayIcon/>
                        }
                        </span>
                    <span className="song-control" onClick={nextSong}><FastForwardIcon/></span>
                </section>
            </main>

            <audio ref={audioRef}autoPlay controls><source src={`http://localhost:5000/play/${songData.author}/${songData.name}`} type={`audio/x-wav`} /></audio>
        </>
    )
}