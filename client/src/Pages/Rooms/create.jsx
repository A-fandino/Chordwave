import React, {useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom"
import Nav from "@/Layout/Nav"
import FancyText from "@/Components/FancyText"
import ErrorModal from "@/Components/ErrorModal/"
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import {useGlobalContext} from "@/context"
import Loading from '@/Components/Loading'
export default function Profile() {
    const {user} = useGlobalContext()

    const [errorMsg, setErrorMsg] = useState(null)
    const [show, setShow] = useState(null)
    const [exists, setExists] = useState(null)

    const navigate = useNavigate()


    const yupValidation = Yup.object().shape({
        max: Yup.number()
        .typeError('Must be a number')
        .required("Specify a number of users")
        .min(2, "Cannot have less than 2 users in a room.")
        .max(8, "Cannot have more than 8 users in a room.")
    })

    const { register, handleSubmit, formState } = useForm({ resolver: yupResolver(yupValidation) })
    const { errors } = formState

    useEffect(() => {
        (async function() {
            const resp = await fetch("http://localhost:5000/api/room-exists", {credentials:"include"})
            setExists(Number(await resp.text()))
        })()
    },[])

    async function onSubmit(data) {
        if (!exists) {
            const resp = await fetch("http://localhost:5000/api/room", {
                mode: "cors",
                credentials:"include",
                method:"POST",
                redirect: "follow",
                body: JSON.stringify(data)
            })
            if (resp.ok) {
                navigate("/rooms/song/"+user.nickname)
                return
            }
                const {msg} = await resp.json()
                setErrorMsg(msg)
                setShow(true)
            return
        }
        const resp = await fetch("http://localhost:5000/api/purge-room", {
            mode: "cors",
            credentials:"include",
            method:"DELETE",
        })
        if (resp.ok) {
            setExists(false)
        }
    }

  return exists == null ? <Loading show={true}/> : (
    <main className="flex flex-col gap-4 h-screen text-white">
        <Nav/>
        <div className="h-full p-4 flex flex-col gap-72">
            <section className="h-full">
                <form method="POST" className="flex flex-col gap-4 items-center h-[80vh] justify-center" onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-col gap-4 items-center justify-center rounded-md p-16 bg-white bg-opacity-10 shadow-md'>
                    {exists ? <>
                            <FancyText size="mid" classes="px-16 py-4">Delete Room</FancyText>
                            <input type="hidden" value={"2"} id='max' name='max' {...register('max')}/>
                            <button type='submit' className="p-2 px-10 font-bold bg-red-500 rounded hover:bg-red-700">Delete</button>
                        </>
                    :<>
                            <FancyText size="mid" classes="px-16 py-4">Create Room</FancyText>
                            <span className="flex gap-4 items-center">
                                <label htmlFor="max" className="font-bold">Max users</label>
                                <input
                                    type="number"
                                    className={`basic black text-center`}
                                    placeholder='2 to 8'
                                    id='max'
                                    name='max'
                                    {...register('max')}
                                />
                            </span>
                            <div className="text-red-500 font-bold">{errors.max?.message}</div>

                            <button type='submit' className="p-2 px-10 font-bold bg-indigo-500 rounded hover:bg-indigo-700">Create</button>
                        </>
                    }
                    </div>
                </form>
            </section>
        </div>
        <ErrorModal show={show} setShow={setShow}>{errorMsg}</ErrorModal>
    </main>
  )
}
