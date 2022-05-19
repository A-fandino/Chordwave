import React, {useState} from 'react'
import { HeartIcon as HeartLine } from "@heroicons/react/outline"
import { HeartIcon as HeartSolid } from "@heroicons/react/solid"

export default function Like(props) {

    const {data} = props
    const [liked, setLiked] = useState(data.liked)


    async function toggleLike() {
      const method = liked ? "DELETE" : "POST"
      console.log(data)
      const resp = await fetch("http://localhost:5000/api/like/"+data.id, {
        method,
        mode: "cors",
        credentials: "include",
      })
      //if (resp.ok) 
      setLiked(!liked)
    }

  return (
    <span className={`heart w-6 hover:text-red-400 ${liked ? 'text-red-600' : ''}`} onClick={toggleLike}>
    {liked ? <HeartSolid/> : <HeartLine/>}
  </span>
  )
}
