import React, {useEffect, useState, useRef} from 'react'
import Nav from "@/Layout/Nav"
import { HeartIcon, DotsHorizontalIcon } from "@heroicons/react/outline"
import SongMiniature from "@/Components/SongMiniature"
import Loading from "@/Components/Loading"
import MenuToolTip from "@/Components/MenuToolTip"
import {useGlobalContext} from "@/context"
import { useParams } from "react-router-dom"
import { useNavigate, Link} from "react-router-dom";

export default function Profile() {
    const params = useParams()
    const {user} = useGlobalContext()
    
    const pfpRef = useRef(null)
    const [userData, setUserData] = useState(user)
    const [userSongs, setUserSongs] = useState([])
    const [loading, setLoading] = useState(false)
    const [showTt, setShowTt] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        (async function() {
            if (params.nickname)
            {
                try {
                    const respUser = await fetch("http://localhost:5000/auth/check/"+params.nickname)
                    const data = await respUser.json()
                    setUserData(data)
                } catch {
                    return navigate('/profile')
                }
            }
        })()
    },[])

    useEffect(() => {
        (async function() {
            const respSong = await fetch("http://localhost:5000/api/userSongs/"+userData.nickname, {
                mode: "cors",
                credentials: "include"
            })
            const songs = await respSong.json()
            setUserSongs(songs)
        })()
    }, [userData])
    async function handleImgUpload(e) {
        const formData = new FormData()
        setLoading(true)
        const file = e.target.files[0]
        pfpRef.current.src = URL.createObjectURL(file)
        formData.append("file",file)
        const resp = await fetch("http://localhost:5000/api/changePFP", {
            method:"POST", mode:"cors", credentials:"include", body:formData
        })
        setLoading(false)

    }
   return (
    <main className="flex flex-col gap-8 h-screen text-white">
        <Nav/>
        <div className="h-full p-4 flex flex-col gap-4">
            <section className="w-full relative p-4 flex justify-center p-4 md:block flex flex-col gap-4 items-center">
                <label htmlFor='fileimg' className={`${userData.id == user.id ? "profile-pic-container" : ""} top-[-45%] translate-y-1/4 w-80 static md:absolute border border-[16px] border-violet-700 aspect-square bg-gray-500 rounded-full z-10 overflow-hidden`}>
                    <picture>
                        <img src={`http://localhost:5000/api/pfp/${userData.id}`} ref={pfpRef} className="h-full w-full object-cover"/>
                    </picture>
                </label>
                {user.id == userData.id ? <input type="file" name="fileimg" id="fileimg" accept='image/*' className='hidden' onChange={handleImgUpload}/> : ""}
                <article className="profile-info-container h-56 static md:left-4 md:right-4 rounded-full bg-violet-700 px-16 md:pl-80 py-4 top-16 z-0 flex flex-col items-center justify-center text-center gap-2">
                    <header className='flex gap-4 items-center'>
                        <h1 className="text-5xl font-bold">{userData.nickname}</h1>
                        {
                        user.id == userData.id  ? (
                        <span className='relative' onClick={()=>setShowTt(true)}>
                            <DotsHorizontalIcon className='w-10 hover:text-gray-400'/>
                            <MenuToolTip show={showTt} setShow={setShowTt}>
                            </MenuToolTip>
                        </span> ) : ''
                        }
                    </header>
                    <h5 className="text-sm text-gray-400 italic">Enjoying since {userData.pretty_date}</h5>
                </article>
            </section>

            {/* PLAYLISTS */}
            <section>
                <h2 className="text-2xl font-bold p-4 underlines">Playlists</h2>
                <div className="w-full flex flex-wrap gap-8 p-4">
                    {
                     user.id == userData.id ? <Link to="/liked" className="px-8 py-4 rounded bg-red-600 text-white font-bold text-center flex gap-4 hover:bg-red-700"> <HeartIcon className='h-6'/> Liked</Link> : ""
                    /* {
                        userSongs.map(song => <SongMiniature data={song}/>)
                    } */}
                </div>
            </section>

            {/* SONGS */}
            <section>
                <h2 className="text-2xl font-bold p-4 underlines">Songs</h2>
                <div className="w-full flex flex-wrap gap-8 p-4">
                    {
                        userSongs.map(song => <SongMiniature data={song}/>)
                    }
                </div>
            </section>
        </div>
        <Loading show={loading} setShow={setLoading}/>
    </main>
  )
}
