import React, {useState} from 'react'
import Modal from '@/Components/Modal'
import FancyText from "@/Components/FancyText"
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '@/context'

export default function index(props) {
  const {show, setShow} = props
  const [name, setName] = useState("")
  const navigate = useNavigate()
  const { user} = useGlobalContext()

  async function handleSubmit(e) {
    e.preventDefault()
    const resp = await fetch("http://localhost:5000/api/new-playlist/"+name, {method:"POST",credentials: "include"})
    if (resp.ok) return navigate(`/playlist/${user.nickname}/${name}`)
    alert("ERROR")
    console.log(resp)

  }

  return (
      <Modal show={show} setShow={setShow} closable={true}>
          <form className="p-4 bg-gray-900 rounded flex flex-col gap-4 items-center" onSubmit={handleSubmit}>
            <FancyText size="small">New Playlist</FancyText>
            <input type="text" id="pl-name" placeholder='Playlist name' className="basic black" value={name} onChange={e => setName(e.target.value)}/>
            <button className='p-2 bg-indigo-500 font-bold w-full'>Send</button>
          </form>
      </Modal>
  )
}
