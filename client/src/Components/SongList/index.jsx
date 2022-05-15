import React, { useEffect, useState } from 'react'
import SongMiniature from '@/Components/SongMiniature'
export default function SongList(props) {
  const [songs, setSongs] = useState([])
  useEffect(() => {
    (async () => {

      const myHeaders = new Headers();
      myHeaders.append('pragma', 'no-cache');
      myHeaders.append('cache-control', 'no-cache');

      const resp = await fetch(props.endpoint || `http://localhost:5000/api/last-songs/${props.amount}`, {
        mode: "cors",
        credentials: "include",
        header: myHeaders
      })
      const data = await resp.json()
      setSongs(data)
    })()
  },[])

  return (
    <div className="flex gap-4 justify-center w-full">
      {
        songs.map((s,i) => {
          return <SongMiniature key={i} data={s}/>
        })
      }
    </div>
  )
}
