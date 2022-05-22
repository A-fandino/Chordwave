import React, { useEffect, useRef } from 'react'

export default function MenuToolTip(props) {
    const tooltipRef = useRef(null)
    const styles = {
        visibility: props.show ? 'visible' : 'hidden',
        position: "absolute",
        left:"25%",
        top:"75%",
        alignItems: "center",
        justifyContent: "center",
        ...props.styles
    }

    function closeCallback(e) {
      e.stopPropagation()
      props.setShow(false)
    }

    useEffect(() => {
      setTimeout(() => {

        if(props.show){
          window.onclick = closeCallback
        } else  {
          window.onclick = null
        }
      },0)
    })

  return (
    <div style={styles} ref={tooltipRef} className='tooltip bg-gray-700 rounded-md flex flex-col w-max'>
        <span onClick={() => location.href="/auth/logout"}>Logout</span>
        <span onClick={() => location.href="/auth/cancel-account"} className='bg-red-600 text-white'>Cancel account</span>
    </div>
  )
}
