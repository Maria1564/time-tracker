import React, { useEffect, useRef, useState } from 'react'
import Button from '../../../components/Button/Button'
import { IActivity } from '../../../interfaces';
import { TiMediaPause, TiMediaStop, TiMediaPlay } from "react-icons/ti";
import s from "./Timer.module.scss"
import { useStopwatch } from 'react-timer-hook';
import { formatTimer } from '../../../utils/helpers';
import axios from '../../../axios';

type TimerProps = {
    currentActivity: IActivity;
    setIsModalOpen: (isOpen: boolean) => void
}

const Timer:React.FC<TimerProps> = ({currentActivity, setIsModalOpen}) => {
    const [currentTime, setCurrentTime] = useState<string>(new Date().toLocaleString())
    const timetRef = useRef<NodeJS.Timeout | null>(null)
    const idActivity = currentActivity.id

    const {
        seconds,
        minutes,
        hours,
        isRunning,
        start,
        pause,
        reset,
      } = useStopwatch({ autoStart: true });

    useEffect(()=>{

        localStorage.setItem("startedTime", new Date().toLocaleString())

        timetRef.current = setInterval(()=>{
            const now = new Date().toLocaleString()
            setCurrentTime(now)
        },1000)

        return ()=>{
            if(timetRef.current !== null){
                clearTimeout(timetRef.current) 
                localStorage.removeItem("startedTime")
                localStorage.removeItem("currentTime")
            }
        }
    }, [])

    //страт/возобновление таймера
    const startTimer = () => {
        start()
        localStorage.setItem("currentTime", new Date().toLocaleString())
        timetRef.current = setInterval(()=>{
            const now = new Date().toLocaleString()
            setCurrentTime(now)
        },1000)

    }

    //Сброс таймера
    const resetTimer = () => {
        const startTime = localStorage.getItem("currentTime")  || localStorage.getItem("startedTime")

        if(startTime !== currentTime){
            //запись в бд
            axios.post("http://localhost:5000/activity-log", {
                idActivity, 
                startTime,
                endTime: currentTime
                }
            ).then(({data}) => {
                console.log("sd data>> ", data)  
                reset()
                setIsModalOpen(false)
                console.log("Сброс")
            })

        }else{
            reset()
            setIsModalOpen(false)
            console.log("Сброс")
        }

    }

    //Пауза
    const pauseTimer = () => {
        pause()
        clearTimeout(timetRef.current!) 
        const startTime = localStorage.getItem("currentTime")  || localStorage.getItem("startedTime")
        localStorage.setItem("currentTime", currentTime)

        //запись в бд
        axios.post("http://localhost:5000/activity-log", {
                idActivity, 
                startTime,
                endTime: currentTime
            }
        )
    }

   return ( 
    <>
        <p className={s.time_value}>{formatTimer(hours)}:{formatTimer(minutes)}:{formatTimer(seconds)}</p>
        <span className={s.name}>{currentActivity.nameActivity}</span>   
        <div className={s.control_buttons}>
            {isRunning ? 
            <Button secondary style={{padding:`20px 45px`} } onClick={pauseTimer} ><TiMediaPause /></Button> : 
            <Button secondary style={{padding:`20px 45px`} } onClick={startTimer} ><TiMediaPlay /></Button> }
            <Button style={{padding:`20px 45px`}} onClick={resetTimer}><TiMediaStop /></Button>
        </div>
    </>
  )
}

export default Timer