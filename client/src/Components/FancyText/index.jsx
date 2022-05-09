import React from 'react'

export default function index(props) {
    const sizes = {small: "text-3xl", mid:"text-7xl", big:"text-9xl"}
    const size = sizes[props.size] || ""
  return (
    <h1 className={`${props.classes} ${size} font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-indigo-500 w-fit bg-animate `}>
        {props.children || "Chordwave"}
    </h1>
  )
}
