import React, { useRef, useState} from 'react'
import Nav from "@/Layout/Nav/"
import Modal from "@/Components/Modal/"
import { UploadIcon, MusicNoteIcon } from "@heroicons/react/solid"

export default function Upload() {
    const formRef  = useRef<HTMLFormElement>(null)
    const [show, setShow] = useState<boolean>(false)
    const [next, setNext] = useState<boolean>(false)
    const [icon, setIcon] = useState(<UploadIcon/>)
    const [filename, setFilename] = useState<string>("")
    const [extension, setExtension] = useState<string>("")
    const handleSubmit = (e: any) => {
        if (!formRef.current) return
        formRef.current.submit()
    }

    function handleFile(event: React.ChangeEvent) {
        const target= event.target as HTMLInputElement;
        const file: File = target.files![0];
        setIcon(<MusicNoteIcon/>)
        setNext(true)
        const [name, ext] = file.name.split(".")
        setFilename(name)
        setExtension(ext)
    }
    return (
    <>
    <Nav/>
    <form method='post' className='flex flex-col items-center p-4 gap-4' ref={formRef} encType="multipart/form-data" action='http://localhost:5000/api/upload'>
        <input type="file" name="file" id="file" accept=".mp3,.wav,.ogg" onChange={handleFile} className='hidden'/>
        <label htmlFor="file" 
        className={`upload rounded-full border border-4 sm:p-24 p-16 bg-gradient-to-tl ${next ? 'text-amber-400 border-amber-400 to-amber-400 hover:animate-pulse animate-spin-slow ' : 'text-white'} flex items-center justify-center w-[15rem] h-[15rem] sm:w-[25rem] sm:h-[25rem]
        hover:text-indigo-400 hover:border-indigo-400 from-transparent via-transparent hover:to-indigo-500`}
        >{icon}</label>
        {
        next && (
        <>
            <span className='text-white text-xl'>{filename}.{extension}</span>
            <input name="name" className="basic black" type="text" value={filename} onChange={(e) => setFilename(e.target.value)}></input>
            <section className="flex flex-col gap-4 items-stretch">
                {/* <input type="hidden" name='extension' value={extension}></input> */}
                <select name="autor" id="autor" className="block basic black hover:border-gray-500 px-4 py-2 pr-8 leading-tight focus:outline-none focus:shadow-outline">
                    <option disabled selected>Seleccione un autor</option>
                    <option value="1">Arnau</option>
                </select>
                <button onClick={() => setShow(true)} className='p-2 bg-indigo-900 rounded text-white hover:bg-indigo-700'>Continuar</button>
            </section>
        </>
        )}
        <Modal show={show} setShow={setShow} closable={false}>
            <div className="text-9xl rounded text-white font-bold">
            Cargando...
            </div>
        </Modal>
    </form>
    </>
    )
    }
