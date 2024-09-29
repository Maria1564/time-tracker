import React, { createContext, ReactNode, useState} from 'react'

type typeContext = {
    showModal: boolean,
    openModal: () => void,
    closeModal: () => void
}

type UserModalProviderProps = {
    children: ReactNode
}

export const UserModalContext = createContext<typeContext | undefined >(undefined)

const UserModalProvider: React.FC<UserModalProviderProps> = ({children}) => {
    const [showModal, setShowModal] = useState<boolean>(false)
    
    const value : typeContext= {
        showModal,
        openModal: ()=>{
            setShowModal(true)
        },
        closeModal: ()=>{
            setShowModal(false)
        }
    }
    return (
        <UserModalContext.Provider value={value}>
        {children}
    </UserModalContext.Provider>
  )
}

export default UserModalProvider

