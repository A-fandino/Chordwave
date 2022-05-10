import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import Nav from "@/Layout/Nav/"
import FancyText from "@/Components/FancyText/"

export default function Song() {

    async function verifyExistence(e) {
        if (!e.target.value){
            e.target.classList.remove("valid-input")
            e.target.classList.remove("invalid-input")
            return
        }
        const resp = await fetch(`http://localhost:5000/auth/exists/${e.target.value}`)
        
        if (!resp.ok) {
            e.target.classList.add("invalid-input")
            e.target.classList.remove("valid-input")
            return
        }
        e.target.classList.remove("invalid-input")
        e.target.classList.add("valid-input")
    }

    return (
    <>
        <Nav/>
        <form className="flex flex-col gap-4 items-center h-[80vh] justify-center" action="http://localhost:5000/auth/login" method='POST'>
            <FancyText size="mid" classes="px-16 py-4">Login</FancyText>
            <label htmlFor="identifier"></label>
            <input type="text" name="identifier" id="identifier" className="basic black" placeholder='Email or nickname' onInput={verifyExistence}/>
            <input type="password" name="password" id="password" className="basic black" placeholder="Password" />
            <button type="submit" className="w-32 h-12 bg-indigo-500 hover:bg-indigo-700 active:bg-indigo-800 rounded text-white font-bold ">Login</button>
            <span className="text-white">Do you need an account? <Link to="/register" className="hover:underline font-bold text-green-500">Register</Link></span>
        </form>
    </>
    )
    }
