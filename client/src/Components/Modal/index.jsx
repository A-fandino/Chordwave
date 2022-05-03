import React, { useRef } from 'react'

export default function Modal(props) {
    // const [visible, useVisible] = useState(true)
    const modRef = useRef(null)
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
    <div style={styles} ref={modRef} className='modal' onClick={(e) => closable && e.target==modRef.current && props.setShow(false)}>
        {props.children}
    </div>
  )
}
