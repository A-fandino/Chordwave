import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import FancyText from "@/Components/FancyText"
import SelectSong from "@/Components/SelectSong"
import { UserCircleIcon, SearchIcon } from '@heroicons/react/solid'
import { useGlobalContext } from '@/context'
 
export default function Header() {
    const { user } = useGlobalContext()
    const [showSearch, setShowSearch] = useState(false)
    const profileLinks = Object.keys(user).length ? <Link to='/profile' className="text-xl font-extrabold text-white h-full hover:underline hover:text-gray-400"><UserCircleIcon className='h-12'/></Link> :(
        <>
            <Link to='/login' className="text-xl font-extrabold text-white w-fit hover:underline">Login</Link>
                |   
            <Link to='/register' className="text-xl font-extrabold text-white w-fit hover:underline">Register</Link>
        </>
    )
    return (
        <>
    <nav className="w-full p-4 bg-transparent text-white font-bold text-2xl flex flex-row justify-between sticky top-0 z-30">
        <Link id="logo" to='/' className="hover:scale-105">
        <FancyText size="small"></FancyText>
        </Link>
        <div className="flex gap-3 items-center">
        <button className='px-6 bg-indigo-500 hover:bg-indigo-600 rounded flex h-full gap-2 items-center font-bold text-sm' onClick={() => setShowSearch(true)}> <SearchIcon className='w-5'/> Search</button>
            {profileLinks}
        </div>
    </nav>
    <SelectSong show={showSearch} setShow={setShowSearch}/>
    </>
    )
    }
