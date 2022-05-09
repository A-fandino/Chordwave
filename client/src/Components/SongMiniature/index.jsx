import React from 'react'
import { MusicNoteIcon } from "@heroicons/react/solid"
import { Link } from "react-router-dom"

export default function SongMiniature(props) {
  return (
    <article className="bg-gray-300 bg-gray-700 rounded w-56 overflow-hidden text-ellipsis break-all whitespace-nowrap p-4">
    <div className="w-full aspect-square p-4"><MusicNoteIcon/></div>
    <Link to={`/song/${props.author}/${props.songName}`} className="text-lg font-bold w-full hover:text-gray-300">
        {props.songName || props.children}
    </Link>
    <Link to={`/profile/${props.author}`} className='block text-gray-400 hover:text-gray-500'>{props.author}</Link>
</article>
  )
}
