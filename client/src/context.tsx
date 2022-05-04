// import React, {useContext} from "react"
import socketIOClient from "socket.io-client"

const ENDPOINT = "http://localhost:5000"
export const socket = socketIOClient(ENDPOINT)

import { createContext, useContext } from "react"
export type GlobalContent = {
  socket: any
}
export const MyGlobalContext = createContext<GlobalContent>({socket})
export const useGlobalContext = () => useContext(MyGlobalContext)