import React from 'react'
import Nav from "@/Layout/Nav/"
import FancyText from "@/Components/FancyText/"
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

export default function Register() {
    const yupValidation = Yup.object().shape({
        nickname: Yup.string()
          .required('Nickname is mandatory.')
          .min(4, 'Add minimum 4 characters'),
        mail: Yup.string().required('Email id is mandatory').email(),
        password: Yup.string()
          .required('Password is mandatory.')
          .min(4, 'Add minimum 4 characters'),
        passwordVerif: Yup.string()
            .required("You must validate your password.")
            .oneOf([Yup.ref('password'), null], 'Passwords must match')

    })
      const formOptions = { resolver: yupResolver(yupValidation) }
      const { register, handleSubmit, formState } = useForm(formOptions)
      const { errors } = formState
    async function onSubmit(data) {
            const resp = await fetch("http://localhost:5000/auth/register", {
                mode: "cors",
                credentials:"include",
                method:"POST",
                redirect: "follow",
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            console.log(resp)
            if (resp.ok) return location.href ="/profile" //I need to refresh the whole page
            const {msg} = await resp.json()
            alert(msg)

    }
    return (
    <>
        <Nav/>
        <form method="POST" className="flex flex-col gap-4 items-center h-[80vh] justify-center" onSubmit={handleSubmit(onSubmit)}>
            <FancyText size="mid" classes="px-16 py-4">Register</FancyText>
            <input 
                type="text" 
                className={`basic black ${errors.nickname ? 'invalid-input' : ''}`} 
                name='nickname' 
                placeholder='Nickname' {...register('nickname')} 
            />
                <div className="text-red-500 font-bold">{errors.nickname?.message}</div>
            <input 
                type="email" 
                className={`basic black ${errors.mail ? 'invalid-input' : ''}`} 
                name='mail' 
                placeholder='Email' {...register('mail')} 
            />
                <div className="text-red-500 font-bold">{errors.mail?.message}</div>
            <input 
                type="password" 
                className={`basic black ${errors.password ? 'invalid-input' : ''}`} 
                name="password" 
                placeholder='Password' {...register('password')}
            />
                <div className="text-red-500 font-bold">{errors.password?.message}</div>
            <input 
                type="password" 
                className={`basic black ${errors.passwordVerif ? 'invalid-input' : ''}`} 
                name="passwordVerif" 
                placeholder='Repeat password' {...register('passwordVerif')}
            />
                <div className="text-red-500 font-bold">{errors.passwordVerif?.message}</div>
            <button type="submit" className="w-32 h-12 bg-indigo-500 hover:bg-indigo-700 active:bg-indigo-800 rounded text-white font-bold ">Register</button>
        </form>
    </>
    )
    }
