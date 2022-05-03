import React, { useEffect, useState } from 'react'
import {useParams} from "react-router-dom"
import Nav from "@/Layout/Nav/"
import { MusicNoteIcon } from "@heroicons/react/solid"

export default function Song() {
    const [songData, setSongData] = useState({})
    const params = useParams()

    const getSongData = async () => {
        const resp = await fetch(`http://localhost:5000/api/song/${params.author}/${params.name}`)
        const data = await resp.json()
        setSongData(data)
    }

    useEffect(() => {
        getSongData()
    }, [])

    return (
    <>
        <Nav/>
        {songData.filename}
    </>
    )
    }
