import React, {useEffect, useState} from 'react'
import { MusicNoteIcon, EyeIcon } from "@heroicons/react/solid"
import { Link } from "react-router-dom"
import Like from "@/Components/Like"

export default function SongMiniature(props) {

  const {data} = props
  return (
    <article className="bg-gray-700 text-white rounded w-56 overflow-hidden text-ellipsis break-all whitespace-nowrap shadow p-4">
    <div className="w-full aspect-square p-4"><MusicNoteIcon/></div>
    <Link to={`/song/${data.author}/${data.name}`} className="text-lg font-bold w-full hover:text-gray-300">
        {data.name || data.children}
    </Link> 
    <Link to={`/profile/${data.author}`} className='block text-gray-400 hover:text-gray-500'>{data.author}</Link>
    <div className="flex gap-4 h-6 justify-between">
      <span className='flex gap-2'>
        <EyeIcon/> {data.listent_count || 0}
      </span>
      <Like data={data}/>
    </div>
</article>
  )
}
