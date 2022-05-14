import React, {useState} from 'react'
import { MusicNoteIcon, HeartIcon as HeartSolid } from "@heroicons/react/solid"
import { HeartIcon as HeartLine } from "@heroicons/react/outline"
import { Link } from "react-router-dom"

export default function SongMiniature(props) {

  const {data} = props
  const [liked, setLiked] = useState(data.liked)


  async function toggleLike() {
    const method = liked ? "DELETE" : "POST"
    const resp = await fetch("http://localhost:5000/api/like/"+data.id, {
      method,
      mode: "cors",
      credentials: "include",
    })
    console.log(resp)
    //if (resp.ok) 
    setLiked(!liked)
  }

  return (
    <article className="bg-gray-300 bg-gray-700 rounded w-56 overflow-hidden text-ellipsis break-all whitespace-nowrap p-4">
    <div className="w-full aspect-square p-4"><MusicNoteIcon/></div>
    <Link to={`/song/${data.author}/${data.name}`} className="text-lg font-bold w-full hover:text-gray-300">
        {data.name || data.children}
    </Link> 
    <Link to={`/profile/${data.author}`} className='block text-gray-400 hover:text-gray-500'>{data.author}</Link>
    <div className="flex gap-4 h-6 justify-end">
        <span className={`heart w-6 hover:text-red-400 ${liked ? 'text-red-600' : ''}`} onClick={toggleLike}>
          {liked ? <HeartSolid/> : <HeartLine/>}
        </span>
    </div>
</article>
  )
}
