import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <>
    <nav className="p-4 bg-transparent text-white font-bold text-2xl flex flex-col justify-between md:flex-row">
        <Link id="logo" to='/' className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-indigo-500 w-fit hover:scale-105">Chordwave</Link>
        <Link to='/login' className="text-xl font-extrabold text-white w-fit hover:scale-105">Login</Link>
    </nav>
    </>
    )
    }
