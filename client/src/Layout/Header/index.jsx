import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDoubleDownIcon } from '@heroicons/react/solid'
import FancyText from "@/Components/FancyText"
export default function Header() {
    const headerRef = useRef(null)
    return (
        <>
    <header ref={headerRef} className="p-4 bg-gray-900 text-white font-bold text-2xl h-screen relative flex flex-col xl:flex-row shadow-xl">
        <div className="flex flex-col justify-center items-center h-full">
            <FancyText size="big" classes="px-16 py-4"></FancyText>
            <p className="text-md text-gray-400 italic">Share your wave</p>
        </div>
        <div className='flex w-full items-center justify-center'>
            <Link to='/upload'><button className='bg-indigo-500 p-8 text-2xl font-bold rounded hover:bg-indigo-700'>Upload song</button></Link>
        </div>
        <span className='xl:absolute static my-8 left-0 right-0 w-full bottom-16 flex justify-center h-20' onClick={() => scrollTo(0, headerRef.current.clientHeight || screen.availHeight)}>
            <ChevronDoubleDownIcon className='h-full animate-bounce hover:bg-black/[.25] rounded-full p-4'/>
        </span>
    </header>
    </>
    )
    }
