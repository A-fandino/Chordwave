import React, {useRef} from 'react'
import Nav from "../../Layout/Nav/index"

export default function Upload() {
    const formRef  = useRef<HTMLFormElement>(null)

    const handleSubmit = (e: any) => {
        if (!formRef.current) return
        formRef.current.submit()
    }
    return (
    <>
    <Nav/>
    <form method='post' ref={formRef} encType="multipart/form-data" action='http://localhost:5000/api/upload'   onChange={handleSubmit}>
        <input type="file" name="file" id="file" accept=".mp3,.wav,.ogg"/>
    </form>
    </>
    )
    }
