import React, { useEffect, useRef, useState } from 'react'
import { useParams, Link, useNavigate } from "react-router-dom"
import Nav from "@/Layout/Nav/"
import AudioBar from "@/Components/AudioBar/"
import VolumeController from "@/Components/VolumeController/"
import { PlayIcon, RewindIcon, FastForwardIcon, MusicNoteIcon, PauseIcon, VolumeUpIcon } from "@heroicons/react/solid"
import { Waveform } from '@uiball/loaders'
import Like from "@/Components/Like"


export default function Song(props) {
    const isMounted = useRef(false)
    const params = props.params || useParams()
    const [songData, setSongData] = useState({author:params.author, name:params.name})
    const [play, setPlay] = useState(true)
    const audioRef = useRef(null)

    const navigate = useNavigate()


    const getSongData = async () => {
        const resp = await fetch(`/api/song/${params.author}/${params.name}`, {mode:"cors",credentials: "include"})
        const data = await resp.json()
        setSongData(data)
        setPlay(true)
    }



    useEffect(() => {
        function handleKey(e) {
            switch(e.key) {
                case " ":
                    setPlay(!play)
                    break;
            }
        }
        document.addEventListener("keydown", handleKey)
         
         return () => document.removeEventListener("keydown", handleKey)
    },[play])

    useEffect(() => {
        if (isMounted.current) play ? audioRef.current.play().catch(e => setPlay(false)) : audioRef.current.pause()
    }, [play,songData])

    useEffect(() => {
        getSongData()
        isMounted.current = true
        audioRef.current = new Audio(`/play/${params.author}/${params.name}`)
        audioRef.current.currentTime = 0
        return () => {audioRef.current.pause(); audioRef.current = null; isMounted.current=false}
    },[navigate])


    function togglePlay() {
        setPlay(!play)
        play ? audioRef.current.play() : audioRef.current.pause()
    }
    
    async function previousSong() {
        setPlay(false)
        navigate(-1)
    }
    async function nextSong() {
        const resp = await fetch("/api/random-song", {mode:"cors",credentials: "include"})
        const data = await resp.json()
        setPlay(false)
        navigate(`/song/${data[0].author}/${data[0].name}`)
    }

    return (
            <main className="flex flex-col gap-4 h-screen text-white">
                <Nav />
                <section className="lg:grid flex flex-col items-center grid-cols-2 gap-4 p-4 justify-items-center">
                    <article className={`music-disc  w-full sm:p-24 md:w-[25rem] max-w-full ${play ? "animate-spin-slow amber"  : ""}`}>
                        { play ? <Waveform 
                        size={120}
                        lineWeight={18}
                        speed={.8} 
                        color={"#fbbf24"}
                        /> 
                        : <MusicNoteIcon/>}
                    </article>
                    <article className='w-full p-4 text-left flex flex-col gap-4 lg:text-left text-center'>
                        <h1 className="text-7xl font-bold break-all">{params.name}</h1>
                        <Link to={`/profile/${params.author}`} className="text-4xl text-gray-500 italic font-serif pl-0 lg:pl-8 hover:text-gray-400"> “{params.author}”</Link>
                    </article>
                </section>
                <footer className='p-4 flex flex-col items-center justify-center gap-4 mt-auto mb-8 w-full'>
                    {audioRef.current && songData ? <AudioBar key={songData.id} audio={audioRef} duration={songData.duration} play={play} setPlay={setPlay} onFinish={nextSong} song={songData}/> : ""}
                    <section className='flex lg:flex-row flex-col-reverse items-center lg:justify-between justify-items-center gap-16 w-full'>
                        <article className='w-max lg:w-8'>
                            <VolumeController key={songData.id} audio={audioRef.current}/>
                        </article>
                        <article className='flex items-center justify-center gap-16'>
                            <span className="song-control" onClick={previousSong}><RewindIcon/></span>
                            <span className="song-control" onClick={togglePlay}>
                                {
                                play ?  <PauseIcon/> : <PlayIcon/>
                                }
                                </span>
                            <span className="song-control" onClick={nextSong}><FastForwardIcon/></span>
                        </article>
                        <article className='w-8 lg:static absolute right-4'><Like key={songData.id} data={songData}/></article>
                    </section>
                </footer>
            </main>
    )
}