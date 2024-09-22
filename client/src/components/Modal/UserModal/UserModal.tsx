import React from 'react'
import Modal from '../Modal'
import Button from '../../Button/Button'
import s from "./UserModal.module.scss"
import { FaRegCircleUser } from 'react-icons/fa6'
import Input from '../../Input/Input'
import { useAppSelector } from '../../../hooks/hooksStore'

type UserModalProps = {
    setShowModal:(status: boolean) => void
}

const UserModal: React.FC<UserModalProps> = ({setShowModal}) => {
    const loginUser = useAppSelector(state => state.user.infoUser?.login)

  return (
    <Modal>
        <h2 className='title'>Профиль</h2>
        <div className={s.info_user}>
        <FaRegCircleUser className={s.logo}/>
        <form action="">
            <Input type="text" name="login" id="login" value={loginUser}/>
            <Input type="text" name="password" id="" value="" />
        </form>
        
      </div>
        <div className={s.btns}>
            <Button className='btn_lite' onClick={()=> setShowModal(false)}>Отмена</Button>
            <Button>Ок</Button>
        </div>
    </Modal>
  )
}

export default UserModal