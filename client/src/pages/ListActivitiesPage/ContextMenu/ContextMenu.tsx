import React from 'react'
import s from "./ContextMenu.module.scss"
import { Link } from 'react-router-dom'
import { MdModeEditOutline, MdDeleteOutline } from "react-icons/md";

type ContextMenuProps = {
    idActivity: number
}

const ContextMenu: React.FC<ContextMenuProps> = ({idActivity}) => {
  return (
    <ul className={s.menu}>
        <li className={s.item}>
            <MdModeEditOutline className={s.icon}/>
            <Link to={`./edit/${idActivity}`}>Редактировать</Link>
        </li>
        <li className={s.item}>
            <MdDeleteOutline className={s.icon}/>
            <a href="#">Удалить</a>
        </li>
    </ul>
  )
}

export default ContextMenu