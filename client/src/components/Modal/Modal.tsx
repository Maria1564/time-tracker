import React, { ReactNode } from 'react'
import  "./Modal.scss"

type ModalProps = {
    children: ReactNode
}

const Modal: React.FC<ModalProps> = ({children}) => {
  return (
    <div className="modal">
        <div className="modal_overlay">
            <div className="modal_content">
                 {children}
            </div>
        </div>
  </div>
  )
}

export default Modal