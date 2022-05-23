// import React, {useContext} from "react"
import socketIOClient from "socket.io-client"
import { createContext, useContext } from "react"

const ENDPOINT = "/"
export const socket = socketIOClient(ENDPOINT, {withCredentials: true})
export const user = await (await fetch("/auth/check", {credentials: 'include'})).json()
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