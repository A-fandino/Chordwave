import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
export default function AudioBar(props) {
    const padStart = (str) => (""+str).padStart(2,'0')
    const navigate = useNavigate()
    let timer = null;
    const [percent, setPercent] = useState(0)
    const [current, setCurrent] = useState(0)
    const {audio, duration, play, setPlay} = props
    const ssToMMSS =  (time) => `${padStart(Math.floor(time/60))}:${padStart(Math.floor(time%60))}`
    const mmss = ssToMMSS(duration)

    const startTimer = function(duration){
          timer = setTimeout(() => advance(duration), 200);
        }

      const advance = function(duration) {
        console.log(duration)
        const curr = audio.current?.currentTime ?? 0
        const increment = 10/duration
        let per = Math.min(increment * curr * 10, 100);
        // console.table({curr,increment,per,duration})
        setPercent(per)
        setCurrent(curr)
        if (!per || per < 100) return startTimer(duration)
        setPlay(false)
        props.onFinish ? props.onFinish() : "";
      }
    useEffect(() => { 
            if (!play)clearTimeout(timer);
            else startTimer(props.song.duration);
    }, [play, percent])

    useEffect(() => {
      return () => clearInterval(timer)
    })
  return (
    <section className="bar-container w-full h-full">
      <article className='w-full bg-gray-500 h-full block h-3 rounded-full'>
        <div style={{width:percent+"%"}} className='h-full bg-white relative'>
          <article className="p-3 rounded-full bg-white absolute right-[-1%] bottom-0 translate-y-1/4 translate-x-1/4"></article>
        </div>
      </article>
      <div className="w-full">{ssToMMSS(current)} - {mmss}</div>
    </section>
  )

  }