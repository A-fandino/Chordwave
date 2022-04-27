import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <>
    <header className="p-4 bg-gray-900 text-white font-bold text-2xl h-screen flex flex-col xl:flex-row">
        <div className="flex flex-col justify-center items-center h-full">
            <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-indigo-500 w-fit px-16 bg-animate" >Chordwave</h1>
            <p className="text-sm text-gray-200 italic">Música por y para todos</p>
        </div>
        <div className='flex w-full items-center justify-center'>
            <Link to='/upload'><button className='bg-indigo-500 p-4 rounded'>Subir canción</button></Link>
        </div>
    </header>
    </>
    )
    }
