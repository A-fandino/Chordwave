import React from 'react'
import { Link } from 'react-router-dom'
import Header from '@/Layout/Header'
import SongList from '@/Components/SongList'

export default function Home() {

    return (
    <main className="flex flex-col pb-4">
        <Header />
        <section className="flex flex-col justify-center items-center">
            <article className="rounded-md bg-gray-900 shadow-xl p-16 text-white w-8/12 mt-64 flex flex-col gap-16">
                <h2 className="text-7xl font-bold">We offer you a <span className="text-green-500">pill</span>!</h2>
                <div className="flex justify-center gap-8 items-center">
                    <Link to="/rooms" className='px-16 py-8 text-3xl bg-blue-500 hover:bg-blue-700 font-bold rounded-full'>Create a room!</Link>
                    <span className='text-2xl '>or</span>
                    <Link to="/rooms" className='px-16 py-8 text-3xl bg-red-500 hover:bg-red-700 font-bold rounded-full'>Join someone!</Link>
                </div>
                <h2 className="text-5xl font-bold text-center text-gray-300">What do you choose?</h2>
            </article>
            
            <article className="rounded-md bg-gray-900 shadow-xl p-16 text-white w-9/12 mt-64 flex flex-col gap-16">
                <h2 className="text-5xl font-bold">New Songs</h2>
                <SongList amount={6}/>
            </article>

            <article className="rounded-md bg-gray-900 shadow-xl p-16 text-white w-9/12 mt-64 flex flex-col gap-16">
                <h2 className="text-5xl font-bold">Some recomendations</h2>
                <SongList endpoint={"http://localhost:5000/api/random-song/6"}/>
            </article>
        </section>
    </main>
    )
    }
