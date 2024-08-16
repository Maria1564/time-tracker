import React from 'react'
import { IActivity } from '../../../interfaces'
import s from "./ActivityCard.module.scss"
import { FaPlay } from "react-icons/fa";

type ActivityCardProps = {
    elem: IActivity;
    setIsModalOpen: (isOpen: boolean) => void;
    setCurrentActivity: (activity: IActivity) => void
}

const ActivityCard:React.FC<ActivityCardProps> = React.memo(({elem, setIsModalOpen, setCurrentActivity}) => {

    //Запуск таймера (всплытие модалки)
    const startTimer = () => {
      setCurrentActivity(elem)
      setIsModalOpen(true)
    }

  return (
    <div className={s.wrapper}>
        <div className={s.color_elem} style={{backgroundColor: elem.hexcode}}></div>
        <p>{elem.nameActivity}</p>
        <FaPlay className={s.icon_play} onClick={startTimer}/>
    </div>
  )
})

export default ActivityCard