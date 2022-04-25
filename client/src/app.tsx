import React, { useEffect } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";
import Home from './Pages/Home/index'
import Upload from './Pages/Upload/index'
import socketIOClient from "socket.io-client"
const ENDPOINT = "http://localhost:5000"

export default function App() {

  useEffect((): any=> {
    const socket = socketIOClient(ENDPOINT)
    socket.on("test", data => {
      socket.emit("ping")
      console.log(data)
    })

    return () => socket.disconnect()
  }, [])

  return (
      <Router>
          <Routes>
              <Route path='/' element={<Home />}/>  
              <Route path='/upload' element={<Upload />}/>  
          </Routes>
    </Router>
  )
}
