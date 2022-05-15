import React, { useRef, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Nav from "@/Layout/Nav/"
import Loading from "@/Components/Loading/"
import { UploadIcon, MusicNoteIcon } from "@heroicons/react/solid"
import {useGlobalContext} from "@/context"


export default function Upload() {
    const navigate = useNavigate()
    const {user} = useGlobalContext()

    const formRef  = useRef(null)
    const [show, setShow] = useState(false)
    const [next, setNext] = useState(false)
    const [icon, setIcon] = useState(<UploadIcon/>)
    const [filename, setFilename] = useState("")
    const [extension, setExtension] = useState("")

    useEffect(() => {
        if (!Object.keys(user).length) navigate("/login")
    })

    function handleFile(event) {
        const target= event.target ;
        const file = target.files[0];
        setIcon(<MusicNoteIcon/>)
        setNext(true)
        const nameSplit = file.name.split(".")
        const ext= nameSplit.pop() 
        const name = nameSplit.join("_")
        setFilename(name)
        if (ext) setExtension(ext)
    }
    return (
    <main className="flex flex-col w-screen h-screen bg-gray-800">
        <Nav/>
        <form method='post' className='flex flex-col items-center p-4 gap-4' ref={formRef} encType="multipart/form-data" action='http://localhost:5000/api/upload'>
            <input type="file" name="file" id="file" accept=".mp3,.wav,.ogg" onChange={handleFile} className='hidden'/>
            <label htmlFor="file" 
            className={`upload music-disc sm:p-24 text-white ${next ? 'amber hover:animate-pulse animate-spin-slow ' : ''}  sm:w-[25rem]
            hover:text-indigo-400 hover:border-indigo-500 from-gray-800 via-gray-800 hover:to-indigo-500`}
            >{icon}</label>
            {
            next && (
            <>
                <span className='text-white text-xl'>{filename}.{extension}</span>
                <input name="name" className="basic black" type="text" value={filename} onChange={(e) => setFilename(e.target.value)}></input>
                <section className="flex flex-col gap-4 items-stretch">
                    <button onClick={() => setShow(true)} className='p-4 bg-indigo-500 rounded text-white hover:bg-indigo-700 font-bold'>Continuar</button>
                </section>
            </>
            )}
            <Loading show={show} setShow={setShow}></Loading>
        </form>
    </main>
    )
    }
