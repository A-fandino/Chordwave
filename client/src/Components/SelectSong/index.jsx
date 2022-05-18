import React, {useState, useEffect, useRef} from 'react'
import Modal from '@/Components/Modal'
import SongMiniature from '../SongMiniature'
import { useParams } from 'react-router-dom'

export default function SelectSong(props) {
  const {show, setShow, selected, setSelected} = props
  const divRef = useRef()
  const { name: plName } = useParams()
  const [name, setName] = useState("")
  const [songs, setSongs] = useState([])

    async function getSongs() {
        const resp = await fetch("http://localhost:5000/api/similar-song/"+name, {credentials:"include"})
        setSongs(await resp.json())
    }

    async function select(song) {
        const resp = await fetch(`http://localhost:5000/api/modify-playlist/${plName}/${song.id}`, {method:"POST", credentials:"include"})
        if (resp.ok) return setSelected(val => [song, ...val])
        alert("ERROR")
    }

    async function unselect(song) {
        const resp = await fetch(`http://localhost:5000/api/modify-playlist/${plName}/${song.id}`, {method:"DELETE", credentials:"include"})
        if (resp.ok) return setSelected(val => val.filter(s => s.id != song.id))
        alert("ERROR")
    }

    useEffect(() => {
        getSongs()
    }, [name])
  return (
    <Modal show={show} setShow={setShow} closable={true}>
        <div ref={divRef} className="container flex flex-col w-full p-8 gap-4" onClick={(e) => e.target.className.includes("container") && setShow(false)}>
            <input type="text" className='basic w-full p-4' placeholder="Search song..." value={name} onChange={e => setName(e.target.value)}/>
            <section className='container flex flex-row gap-4 flex-wrap overflow-scroll h-[80vh] items-start'>
                {
                    songs.map(song => (
                        <article key={song.id} className="bg-gray-700 flex flex-col items-center">
                            <SongMiniature data={song}/>
                            {
                            setSelected ? ( //IF YOU CAN SELECT
                                selected.some(elem =>elem.id == song.id) ? //IF IS SELECTED
                                <span className="bg-red-500 hover:bg-red-600 text-white p-4 rounded w-full text-center" onClick={e => unselect(song)}>Remove</span>
                                    : //IF IS NOT SELECTED
                                <span className="bg-green-500 hover:bg-green-600 text-white p-4 rounded w-full text-center" onClick={e => select(song)}>Select</span>
                            ) : "" //IF YOU CANNOT SELECT
                            }
                        </article>
                    ))
                }
            </section>
        </div>
    </Modal>
  )
}
