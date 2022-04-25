import React, { ChangeEventHandler, JSXElementConstructor } from 'react'
import Nav from "../../Layout/Nav/index"


export default function Upload() {

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const form = new FormData()
        if (!event.target.files) return
        form.append("file",event.target.files[0])

        const resp = await fetch('http://localhost:5000/api/upload', {
            method:"POST",
            mode: "cors"
        })
        const data = await resp.text()
        console.log(data)

    }

    return ( //Temporal FORM
    <>
    <Nav/>
        <input type="file" name="" id=""  onChange={handleUpload}/>
    </>
    )
    }
