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
import Song from '@/Pages/Song/'
import SocketContext from "./context"
// import socketIOClient from "socket.io-client"

// const ENDPOINT = "http://localhost:5000"

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
      <SocketContext.provider>
      <Router>
        {/* {display && <Nav />} */}
        <Routes>
          <Route path='/' exact element={<Home />}/> 
          <Route path='/upload' element={<Upload />}/>  
          <Route path='/song/:author' element={<>Authorlist</>}/>  
          <Route path='/song/:author/:name' element={<Song />}/>  
        </Routes>
      </Router>
    </SocketContext.provider>
  )
}

function ConNavbar() {
    return (
      <>
    <Routes>
    </Routes>
    </>)
}