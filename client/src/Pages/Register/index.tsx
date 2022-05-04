import React from 'react'
import Nav from "@/Layout/Nav/"

export default function Register() {
    return (
    <>
        <Nav/>
        <form className="flex flex-col gap-4 items-center"action="http://localhost:5000/auth/register" method="POST">
            <input type="text" name='nickname' placeholder='Nickname' />
            <input type="email" name='mail' />
            <input type="password" name="password"/>
            <button type="submit">Send</button>
        </form>
    </>
    )
    }
