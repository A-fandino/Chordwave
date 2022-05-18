import React, {useEffect, useState} from 'react'

export default function AudioBar(props) {
    const padStart = (str) => (""+str).padStart(2,'0')
    let timer = null;
    const [percent, setPercent] = useState(0)
    const [current, setCurrent] = useState(0)
    const {audio, duration, play, setPlay} = props
    const ssToMMSS =  (time) => `${padStart(Math.floor(time/60))}:${padStart(Math.floor(time%60))}`
    const mmss = ssToMMSS(duration)

    const startTimer = function(){ 
          timer = setTimeout(function (){advance()}, 200);
        }

      const advance = function() {
        const curr = audio.current?.currentTime ?? 0
        const increment = 10/duration
        let per = Math.min(Math.ceil(increment * curr * 10), 100);
        setPercent(per)
        setCurrent(curr)
        if (!per || per < 100) return startTimer()
        props.onFinish ? props.onFinish() : setPlay(false);
        // audio.current.currentTime = 0
      }
    useEffect(() => { 
            if (!play)clearTimeout(timer);
            else startTimer(duration);
    }, [play])
  return (
    <div style={{width:percent+"%"}} className='h-2 bg-white'>{ssToMMSS(current)} - {mmss}</div>
  )

  }