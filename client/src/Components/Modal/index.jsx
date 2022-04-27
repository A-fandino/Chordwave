import React, { useState } from 'react'

export default function index(props) {
    // const [visible, useVisible] = useState(true)
    const styles = {
        visibility: props.show ? 'visible' : 'hidden',
        position: "absolute",
        left:0,right:0,top:0,bottom:0,
        background:"#0005",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...props.styles
    }

  return (
    <div style={styles} className='modal' onClick={() =>  props.useShow(false)}>
        {props.children}
    </div>
  )
}
