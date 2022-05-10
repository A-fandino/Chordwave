import React from 'react'
import { Link } from 'react-router-dom'
import FancyText from "@/Components/FancyText"
export default function Header() {
    return (
        <>
    <header className="p-4 bg-gray-900 text-white font-bold text-2xl h-screen flex flex-col xl:flex-row shadow-xl">
        <div className="flex flex-col justify-center items-center h-full">
            <FancyText size="big" classes="px-16 py-4"></FancyText>
            <p className="text-sm text-gray-200 italic">Música por y para todos</p>
        </div>
        <div className='flex w-full items-center justify-center'>
            <Link to='/upload'><button className='bg-indigo-500 p-8 text-2xl font-bold rounded hover:bg-indigo-700'>Upload song</button></Link>
        </div>
    </header>
    </>
    )
    }
