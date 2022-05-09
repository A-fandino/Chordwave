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
import { MyGlobalContext, socket, user } from "./context"

// import socketIOClient from "socket.io-client"
// const ENDPOINT = "http://localhost:5000"

export default function App() {
  

  // const location = useLocation();
  // const path = location.pathname;
  // const [display, setDisplay] = useState(
  //   path !== "/" ? true : false
  // );
  useEffect((): any=> {
    socket.connect()
    socket.on("test", data => {
      socket.emit("ping")
      console.log(data)
    })

    return () => socket.disconnect()
  }, [])

  return (
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