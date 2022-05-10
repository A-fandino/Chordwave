import React, { useEffect, useState } from 'react'
import SongMiniature from '@/Components/SongMiniature'
export default function SongList(props) {
  const [songs, setSongs] = useState([])
  useEffect(() => {
    (async () => {
      const resp = await fetch(props.endpoint || `http://localhost:5000/api/last-songs/${props.amount}`)
      const data = await resp.json()
      console.log(data)
      setSongs(data)
    })()
  },[])

  return (
    <div className="flex gap-4 justify-center w-full">
      {
        songs.map((s,i) => {
          return <SongMiniature key={i} author={s.author} songName={s.name}/>
        })
      }
    </div>
  )
}
