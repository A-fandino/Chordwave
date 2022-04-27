import React, {useRef, useState} from 'react'
import Nav from "@/Layout/Nav/"
import Modal from "@/Components/Modal/"
import { UploadIcon, MusicNoteIcon } from "@heroicons/react/solid"

export default function Upload() {
    const formRef  = useRef<HTMLFormElement>(null)
    const [show, setShow] = useState<boolean>(false)
    const [next, setNext] = useState<boolean>(false)
    const [icon, setIcon] = useState(<UploadIcon/>)
    const [filename, setFilename] = useState(null)
    const handleSubmit = (e: any) => {
        if (!formRef.current) return
        formRef.current.submit()
    }

    function handleFile(event: HTMLInputElement) {
        setIcon(<MusicNoteIcon/>)
        setNext(true)
        setFilename('file.wav')
    }
    return (
    <>
    <Nav/>
    <form method='post' className='flex flex-col items-center p-4 gap-4' ref={formRef} encType="multipart/form-data" action='http://localhost:5000/api/upload'>
        <input type="file" name="file" id="file" accept=".mp3,.wav,.ogg" onChange={handleFile} className='hidden'/>
        <label htmlFor="file" 
        className={`rounded-full border border-4 sm:p-24 p-16 bg-gradient-to-tl ${next ? 'text-amber-400 border-amber-400 to-amber-400' : 'text-white'} flex items-center justify-center w-[15rem] h-[15rem] sm:w-[25rem] sm:h-[25rem]
        hover:text-indigo-400 hover:border-indigo-400 from-transparent via-transparent hover:to-indigo-500`}
        >{icon}</label>
        <span className='text-white text-xl'>{filename}</span>
        <button type='button' style={{visibility:next ? 'visible' : 'hidden'}} onClick={() => setShow(true)} className='p-2 bg-indigo-500 rounded text-white hover:bg-indigo-700'>Continuar</button>
        <Modal show={show} setShow={setShow}>Pingo</Modal>
    </form>
    </>
    )
    }
