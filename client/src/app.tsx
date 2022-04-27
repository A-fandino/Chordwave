import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";
import Home from '@/Pages/Home/'
import Nav from '@/Layout/Nav/'
import Upload from '@/Pages/Upload/'
import { useLocation } from "react-router-dom";
import socketIOClient from "socket.io-client"

const ENDPOINT = "http://localhost:5000"

export default function App() {
  // const location = useLocation();
  // const path = location.pathname;
  // const [display, setDisplay] = useState(
  //   path !== "/" ? true : false
  // );
  useEffect((): any=> {
    // const socket = socketIOClient(ENDPOINT)
    // socket.on("test", data => {
    //   socket.emit("ping")
    //   console.log(data)
    // })

    // return () => socket.disconnect()
  }, [])

  return (
      <Router>
        {/* {display && <Nav />} */}
        <Routes>
          <Route path='/' exact element={<Home />}/> 
          <Route path='/upload' element={<Upload />}/>  
        </Routes>
    </Router>
  )
}

function ConNavbar() {
    return (
      <>
    <Routes>
    </Routes>
    </>)
}