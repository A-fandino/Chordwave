import React, {useEffect, useRef, useState} from 'react'
import { VolumeUpIcon, VolumeOffIcon } from "@heroicons/react/solid"

export default function VolumeController(props) {
  const [volume, setVolume] = useState(localStorage.getItem("volume") || props.audio?.volume || .5)
  const volumeBeforeMute = useRef(volume)
  useEffect(() => {
      if (props.audio) props.audio.volume = volume
      localStorage.setItem("volume", volume)

    function handleKey(e) {
        switch(e.key) {
            case "m":
                if (volume > 0) {
                  mute()
                  break;
                }
                unmute()
              break;
        }
    }
    document.addEventListener("keydown", handleKey)
    
    return () => document.removeEventListener("keydown", handleKey)

  },[volume])

  const handleChange = e => {
    setVolume(e.target.value)
  }

  function mute() {
    volumeBeforeMute.current=volume
    setVolume(0)
  }
  const unmute = () => {
    setVolume(volumeBeforeMute.current || .1)
  }

  return (
    <div className="volume-controller flex gap-4 w-max items-center font-bold">
        {volume > 0 ? <VolumeUpIcon onClick={mute} className='w-10 hover:text-gray-400'/> : <VolumeOffIcon onClick={unmute} className='w-10 hover:text-gray-400'/>}

        <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleChange}></input>

        <span>{Math.floor(volume*100)}%</span>
    </div>
  )
}
