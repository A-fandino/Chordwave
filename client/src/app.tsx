import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";
import Home from './Pages/Home/index'
import Upload from './Pages/Upload/index'

export default function App() {
  return (
      <Router>
          <Routes>
              <Route path='/' element={<Home />}/>  
              <Route path='/upload' element={<Upload />}/>  
          </Routes>
    </Router>
  )
}
