import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";
import Home from '@/Pages/Home/'
import Upload from '@/Pages/Upload/'
import Song from '@/Pages/Song/'
import Login from '@/Pages/Login/'
import Register from '@/Pages/Register/'
import Rooms from '@/Pages/Rooms/'
import CreateRoom from '@/Pages/Rooms/create.jsx'
import SongRoom from '@/Pages/Rooms/song.jsx'
import Profile from '@/Pages/Profile/'
import Liked from '@/Pages/Liked/'
import Loading from '@/Components/Loading/'
import { MyGlobalContext, useGlobalContext} from "./context"

// import socketIOClient from "socket.io-client"
// const ENDPOINT = "http://localhost:5000"

export default function App() {
  const {socket} = useGlobalContext() 
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)
 
  useEffect(() => {
    socket.connect()
    socket.on("welcome", data => {
      console.log("Connected to Socket Server!")
    });
    (async function() {
      const resp = await fetch("http://localhost:5000/auth/check", {credentials: 'include', mode:"cors"})
      const data = await resp.json()
      setUser(data)
      setLoading(false)
    })()
    return () => socket.close()
  }, [])

  return loading ? <Loading show={true}/>
    : (
      <MyGlobalContext.Provider value={{socket, user}}>
      <Router>
        {/* {display && <Nav />} */}
        <Routes>
          <Route path='/' element={<Home />}/> 
          <Route path='/upload' element={<Upload />}/>  
          <Route path='/song/:author' element={<>Authorlist</>}/>  
          <Route path='/song/:author/:name' element={<Song />}/>  
          <Route path='/login' element={<Login />}/>  
          <Route path='/register' element={<Register />}/>  
          <Route path='/rooms' element={<Rooms />}/>  
          <Route path='/rooms/song/:id' element={<SongRoom />}/>  
          <Route path='/rooms/create' element={<CreateRoom />}/>  
          <Route path='/profile' element={<Profile />}/>  
          <Route path='/profile/:nickname' element={<Profile />}/> 
          <Route path='/liked' element={<Liked />}/>  
        </Routes>
      </Router>
      </MyGlobalContext.Provider>
  )
}

function ConNavbar() {
    return (
      <>
    <Routes>
    </Routes>
    </>)
}