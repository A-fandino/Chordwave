import React, {useEffect, useState} from 'react'
import Loading from '@/Components/Loading'
import Nav from '@/Layout/Nav'
import Chat from '@/Components/Chat'
import Song from '@/Pages/Song'
import { useParams, Link, Navigate, useNavigate } from "react-router-dom"
import { PlayIcon, RewindIcon, FastForwardIcon, MusicNoteIcon, PauseIcon } from "@heroicons/react/solid"
import { Waveform } from '@uiball/loaders'
import { useGlobalContext } from '@/context'

export default function SongRoom() {
  const params = useParams()
  const navigate = useNavigate()
  const {id} = params
  const [loading, setLoading] = useState(true)
  const [play, setPlay] = useState(true)
  
  const { socket } = useGlobalContext()
    useEffect(() => {
        socket.emit("join",{room:id}, () => {
          setLoading(false)
        })
      return () => {
        socket.emit("leave", {room:id})
      }
    },[])

    function togglePlay() {
      setPlay(!play)
      play ? audioRef.current.play() : audioRef.current.pause()
  }

  async function previousSong() {
      navigate(-1)
  }
  async function nextSong() {
      const resp = await fetch("http://localhost:5000/api/random-song")
      const data = await resp.json()
      location.href = (`/song/${data[0].author}/${data[0].name}`)
  }


  return loading ? <Loading show={loading} setShow={setLoading}/> : (
    <main className="w-full h-screen grid grid-cols-4">
      <section className='col-span-3'><Song/></section>
      <section className='w-full h-full flex items-center'><Chat/></section>
    </main>)
}
