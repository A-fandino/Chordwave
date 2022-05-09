import { Waveform } from '@uiball/loaders'
import Modal from "@/Components/Modal"
import React from 'react'

export default function Loading(props) {
  return (
    <Modal show={props.show} setShow={props.setShow} closable={props.closable || false}>
        <Waveform 
        size={60}
        lineWeight={8}
        speed={1.2} 
        color={"#6366f1"}
        />
    </Modal>
  )
}



