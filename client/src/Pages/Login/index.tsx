import React, { useEffect, useState } from 'react'
import {useParams} from "react-router-dom"
import Nav from "@/Layout/Nav/"

export default function Song() {
    return (
    <>
        <Nav/>
        <form className="flex flex-col gap-4 items-center" action="http://localhost:5000/auth/login" method='POST'>
            <input type="text" name="identifier" placeholder='Email or nickname'/>
            <input type="password" name="password" id="password" />
            <button type="submit">Login</button>
        </form>
    </>
    )
    }
