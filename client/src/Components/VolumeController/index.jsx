import React, {useEffect, useRef, useState} from 'react'
import { VolumeUpIcon, VolumeOffIcon } from "@heroicons/react/solid"

export default function VolumeController(props) {
  const [volume, setVolume] = useState(props.audio?.volume || .5)
  const volumeBeforeMute = useRef(volume)
  useEffect(() => {
      if (props.audio) props.audio.volume = volume
  },[volume])
  return (
    <div className="volumne-controller flex gap-4 w-max items-center font-bold">
        {volume > 0 ? <VolumeUpIcon onClick={() => {volumeBeforeMute.current=volume;setVolume(0)}} className='w-10 hover:text-gray-400'/> : <VolumeOffIcon onClick={() => setVolume(volumeBeforeMute.current || .1)} className='w-10 hover:text-gray-400'/>}

        <input type="range" min="0" max="1" step="0.01" value={volume} onChange={e => setVolume(e.target.value)} className="slider" id="myRange"></input>

        <span>{Math.floor(volume*100)}%</span>
    </div>
  )
}
