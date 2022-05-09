// import React, {useContext} from "react"
import socketIOClient from "socket.io-client"
import { createContext, useContext } from "react"

const ENDPOINT = "http://localhost:5000"
export const socket = socketIOClient(ENDPOINT)
export const user = await (await fetch("http://localhost:5000/auth/check", {credentials: 'include'})).json()
// export type GlobalContent = {
//   socket: any
//   user: UserData
// }
export const MyGlobalContext = createContext({socket, user:{}})
export const useGlobalContext = () => useContext(MyGlobalContext)


// interface UserData {
//   nickname: string;
//   email: string;
//   pretty_date: string;
//   mmddyy: string,
//   ddmmyy: string
// }