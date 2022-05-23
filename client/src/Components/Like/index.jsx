import React, {useState} from 'react'
import { HeartIcon as HeartLine } from "@heroicons/react/outline"
import { HeartIcon as HeartSolid } from "@heroicons/react/solid"

export default function Like(props) {

    const {data} = props
    const [liked, setLiked] = useState(data.liked)
    const [likeCount, setLikeCount] = useState(data.like_count)


    async function toggleLike() {
      const method = liked ? "DELETE" : "POST"
      console.log(data)
      const resp = await fetch("/api/like/"+data.id, {
        method,
        mode: "cors",
        credentials: "include",
      })
      //if (resp.ok) 
      setLikeCount(likeCount + (liked ? -1 : 1))
      setLiked(!liked)
    }

  return (
    <span className={`heart flex gap-2 min-w-min hover:text-red-400 cursor-pointer ${liked ? 'text-red-600' : ''}`} onClick={toggleLike}>
    {likeCount}{liked ? <HeartSolid className="w-6"/> : <HeartLine className="w-6"/>}
  </span>
  )
}
