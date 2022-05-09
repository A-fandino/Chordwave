// import React, {useContext} from "react"
import socketIOClient from "socket.io-client"
import { createContext, useContext } from "react"

const ENDPOINT = "http://localhost:5000"
export const socket = socketIOClient(ENDPOINT)
export const user = {id:1}
export type GlobalContent = {
  socket: any
  user: Object
}
export const MyGlobalContext = createContext<GlobalContent>({socket, user})
export const useGlobalContext = () => useContext(MyGlobalContext)