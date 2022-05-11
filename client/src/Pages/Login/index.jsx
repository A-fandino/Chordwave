import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import Nav from "@/Layout/Nav/"
import FancyText from "@/Components/FancyText/"
import ErrorModal from "@/Components/ErrorModal/"
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

export default function Song() {

    const [errorMsg, setErrorMsg] = useState(null)
    const [show, setShow] = useState(null)

    const yupValidation = Yup.object().shape({
        identifier: Yup.string()
          .required('Nickname/Email is mandatory.')
          .test("User exists","User does not exist",async val => {
            const resp = await fetch(`http://localhost:5000/auth/exists/${val}`)
            console.log(resp)
            return resp.ok
          }),
        password: Yup.string()
          .required('Password is mandatory.')
    })

    const { register, handleSubmit, formState } = useForm({ resolver: yupResolver(yupValidation) })
    const { errors } = formState

    async function onSubmit(data) {
        const resp = await fetch("http://localhost:5000/auth/login", {
            mode: "cors",
            credentials:"include",
            method:"POST",
            redirect: "follow",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        console.log(data,resp)
        if (resp.ok) return location.href ="/profile" //I need to refresh the whole page
        const {msg} = await resp.json()
        setErrorMsg(msg)
        setShow(true)
}

    return (
    <>
        <Nav/>
        <form className="flex flex-col gap-4 items-center h-[80vh] justify-center" method='POST' onSubmit={handleSubmit(onSubmit)}>
            <FancyText size="mid" classes="px-16 py-4">Login</FancyText>
            <label htmlFor="identifier"></label>
            <input type="text" 
                name="identifier" 
                id="identifier" 
                className={`basic black ${errors.identifier ? 'invalid-input' : ''}`}
                placeholder='Email or nickname'
                {...register('identifier')} 
            />
                <div className="text-red-500 font-bold">{errors.identifier?.message}</div>
            <input 
                type="password" 
                name="password" 
                id="password" 
                className={`basic black ${errors.password ? 'invalid-input' : ''}`}
                placeholder="Password" 
                {...register('password')} 
            />
                <div className="text-red-500 font-bold">{errors.password?.message}</div>
            <button type="submit" className="w-32 h-12 bg-indigo-500 hover:bg-indigo-700 active:bg-indigo-800 rounded text-white font-bold">
                Login
            </button>
            <span className="text-white">Do you need an account? <Link to="/register" className="hover:underline font-bold text-green-500">Register</Link></span>
        </form>
        <ErrorModal show={show} setShow={setShow}>{errorMsg}</ErrorModal>
    </>
    )
    }
