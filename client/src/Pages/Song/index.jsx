import React, { useEffect, useState } from 'react'
import { useParams, Link } from "react-router-dom"
import Nav from "@/Layout/Nav/"
import { MusicNoteIcon } from "@heroicons/react/solid"
import { Waveform } from '@uiball/loaders'

import { useGlobalContext } from '@/context'

export default function Song() {
    const [songData, setSongData] = useState({})
    const { socket } = useGlobalContext()

    const params = useParams()

    const getSongData = async () => {
        // const resp = await fetch(`http://localhost:5000/api/song/${params.author}/${params.name}`)
        // const data = await resp.text()
        // console.log(data)
        // setSongData(data)
    }

    useEffect(() => {
        console.log(socket)
        getSongData()
    })

    return (
        <>
            <main className="flex flex-col gap-4 h-screen text-white">
                <Nav />
                <section className="grid grid-cols-2 gap-4 p-4 justify-items-center">
                    <article className="music-disc w-[27rem] border border-4 border-amber-700 aspect-square rounded-full z-10 overflow-hidden p-16
                    sm:p-24 p-16 bg-gradient-to-tl text-amber-400 border-amber-400 to-amber-400 animate-spin-slow flex flex-col items-center justify-center w-[15rem] h-[15rem] sm:w-[25rem] sm:h-[25rem]
                    from-transparent via-transparent">
                        {/* <MusicNoteIcon/> */}
                        <Waveform 
                        size={120}
                        lineWeight={18}
                        speed={.8} 
                        color={"#fbbf24"}
                        />
                    </article>
                    <article className='w-full p-4 text-left flex flex-col gap-2'>
                        <h1 className="text-5xl font-bold">{params.name}</h1>
                        <Link to={`/profile/${params.author}`} className="text-3xl text-gray-500 italic font-serif pl-4 hover:text-gray-400"> “{params.author}”</Link>
                    </article>

                </section>
            </main>
            <audio autoPlay><source src={`http://localhost:5000/play/${params.author}/${params.name}`} type={`audio/x-wav`} /></audio>
        </>
    )
}