import React from "react"
import s from "./ContextMenu.module.scss"
import { Link } from "react-router-dom"
import { MdModeEditOutline, MdDeleteOutline } from "react-icons/md"
import { removeActivity } from "../../../store/slices/activitiesSlice"
import { useAppDispatch } from "../../../hooks/hooksStore"


type ContextMenuProps = {
  idActivity: number
  setOpenModal: (state: boolean) => void;
  setActiveContextMenu: (idCard: null | number) => void
}

const ContextMenu: React.FC<ContextMenuProps> = ({idActivity, setOpenModal, setActiveContextMenu }) => {
  const dispatch = useAppDispatch()

  const changeSelectedActivity = () => {
    setOpenModal(true)
    setActiveContextMenu(null)
  }

  const deleteActivity = ()=>{
    dispatch(removeActivity(idActivity))
  }


  return (
    <>
      <ul className={s.menu}>
        <li className={s.item} onClick={changeSelectedActivity}>
          <MdModeEditOutline className={s.icon} />
          <Link to="#">Редактировать</Link>
        </li>
        <li className={s.item} onClick={deleteActivity}>
          <MdDeleteOutline className={s.icon} />
          <Link to="#">Удалить</Link>
        </li>
      </ul>
      
    </>
  )
}

export default ContextMenu
