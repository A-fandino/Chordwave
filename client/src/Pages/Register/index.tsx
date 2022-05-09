import React from 'react'
import Nav from "@/Layout/Nav/"
import FancyText from "@/Components/FancyText/"

export default function Register() {
    return (
    <>
        <Nav/>
        <form className="flex flex-col gap-4 items-center h-[80vh] justify-center" action="http://localhost:5000/auth/register" method="POST">
            <FancyText size="mid" classes="px-16 py-4">Register</FancyText>
            <input type="text" className="basic black" name='nickname' placeholder='Nickname' required />
            <input type="email" className="basic black" name='mail' placeholder='Email'required />
            <input type="password" className="basic black" name="password" placeholder='Password'required />
            <input type="password" className="basic black" name="password-verify" placeholder='Repeat password'required />
            <button type="submit" className="w-32 h-12 bg-indigo-500 hover:bg-indigo-700 active:bg-indigo-800 rounded text-white font-bold ">Register</button>
        </form>
    </>
    )
    }
