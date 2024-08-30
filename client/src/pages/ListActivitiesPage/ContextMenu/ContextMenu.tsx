import React from "react"
import s from "./ContextMenu.module.scss"
import { Link } from "react-router-dom"
import { MdModeEditOutline, MdDeleteOutline } from "react-icons/md"


type ContextMenuProps = {
  setOpenModal: (state: boolean) => void;
  setActiveContextMenu: (idCard: null | number) => void
}

const ContextMenu: React.FC<ContextMenuProps> = ({setOpenModal, setActiveContextMenu }) => {

  const changeSelectedActivity = () => {
    setOpenModal(true)
    setActiveContextMenu(null)
  }


  return (
    <>
      <ul className={s.menu}>
        <li className={s.item} onClick={changeSelectedActivity}>
          <MdModeEditOutline className={s.icon} />
          <Link to="#">Редактировать</Link>
        </li>
        <li className={s.item}>
          <MdDeleteOutline className={s.icon} />
          <Link to="#">Удалить</Link>
        </li>
      </ul>
      
    </>
  )
}

export default ContextMenu
