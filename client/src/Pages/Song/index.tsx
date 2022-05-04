import React, { useEffect, useState } from 'react'
import {useParams} from "react-router-dom"
import Nav from "@/Layout/Nav/"
import { useGlobalContext } from '@/context'

export default function Song() {
    const [songData, setSongData] = useState({})
    const { socket } = useGlobalContext()

    const params = useParams()

    const getSongData = async () => {
        const resp = await fetch(`http://localhost:5000/api/song/${params.author}/${params.name}`)
        const data = await resp.text()
        console.log(data)
        setSongData(data)
    }

    useEffect(() => {
    console.log(socket)
    getSongData()
    }, [])

    return (
    <>
        <Nav/>
        <video autoplay><source src="http://localhost:5000/play" type="audio/x-wav"/></video>
    </>
    )
    }