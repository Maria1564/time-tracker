import React from 'react'
import Button from '../../../components/Button/Button'
import { IActivity } from '../../../interfaces';
import { TiMediaPause, TiMediaStop } from "react-icons/ti";
import s from "./Timer.module.scss"

type TimerProps = {
    currentActivity: IActivity;
    setIsModalOpen: (isOpen: boolean) => void
}

const Timer:React.FC<TimerProps> = ({currentActivity, setIsModalOpen}) => {

  return (
    <>
        <p className={s.time_value}>00:00:00</p>
        <span className={s.name}>{currentActivity.nameActivity}</span>   
        <div className={s.control_buttons}>
            <Button  className='btn_lite' style={{padding:`20px 45px`}}><TiMediaPause /></Button>
            <Button style={{padding:`20px 45px`}} onClick={()=>setIsModalOpen(false)}><TiMediaStop /></Button>
        </div>
    </>
  )
}

export default Timer