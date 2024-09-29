import { UserModalContext } from "@/components/Modal/UserModal/UserModalProvider"
import { useContext } from "react"

export const useModal = ()=>{
    return  useContext(UserModalContext)
}