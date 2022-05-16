import { Waveform } from '@uiball/loaders'
import Modal from "@/Components/Modal"
import React from 'react'

export default function Loading(props) {
  const {show, setShow} = props
  return (
    <Modal show={show} setShow={setShow} closable={true}>
    <section className="w-6/12 bg-gray-900 text-white rounded border-4 border-red-500">
        <header className="flex justify-between items-center p-4 bg-red-500 w-full">
            <h2 className="text-4xl font-bold">⚠ ERROR</h2>
            <button className='text-sm h-min p-2 w-8 hover rounded-lg font-bold bg-black bg-opacity-10 hover:bg-opacity-20' onClick={() => setShow(false)}>
                x
             </button>
        </header>
        <div className="p-8 font-bold">
         {props.children}
        </div>
    </section>
  </Modal>  
  )
}



