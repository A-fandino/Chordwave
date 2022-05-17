import React, {useState, useEffect, useRef} from 'react'
import Modal from '@/Components/Modal'
import SongMiniature from '../SongMiniature'

export default function SelectSong(props) {
  const {show, setShow, selected, setSelected} = props
  const divRef = useRef()
  const [name, setName] = useState("")
  const [songs, setSongs] = useState([])

    async function getSongs() {
        const resp = await fetch("http://localhost:5000/api/similar-song/"+name)
        setSongs(await resp.json())
    }

    useEffect(() => {
        getSongs()
    }, [name])

  return (
    <Modal show={show} setShow={setShow} closable={true}>
        <div ref={divRef} className="flex flex-col w-full p-8 gap-4" onClick={(e) => e.target == divRef.current && setShow(false)}>
            <input type="text" className='basic w-full p-4' placeholder="Search song..." value={name} onChange={e => setName(e.target.value)}/>
            <section className='flex flex-row gap-4 flex-wrap overflow-scroll h-[80vh] items-start'>
                {
                    songs.map(song => (
                        <article key={song.id} className="bg-gray-700 flex flex-col items-center">
                            <SongMiniature data={song}/>
                            {
                            selected.some(elem =>{console.log(elem, song) ; return elem.id == song.id}) ?
                            <span className="bg-red-500 hover:bg-red-600 text-white p-4 rounded w-full text-center" onClick={e => setSelected(val => val.filter(s => s.id != song.id))}>Remove</span>
                            :
                            <span className="bg-green-500 hover:bg-green-600 text-white p-4 rounded w-full text-center" onClick={e => setSelected(val => [song, ...val])}>Select</span>
                            }
                        </article>
                    ))
                }
            </section>
        </div>
    </Modal>
  )
}