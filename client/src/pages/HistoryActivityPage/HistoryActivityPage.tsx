import React, { useEffect, useState } from 'react'
import s from "./HistoryActivityPage.module.scss"
import { useNavigate, useParams } from 'react-router-dom'
import { IActivityWithTime } from '../../interfaces'
import axios from '../../axios'
import { groupActivitiesByDate } from '../../utils/helpers'
import { IoMdArrowRoundBack } from "react-icons/io";
import ActivityItem from './ActivityItem/ActivityItem'

const HistoryActivityPage: React.FC = () => {
    const {id: idActivity} = useParams()
    const navigate = useNavigate()
  
    const [listInfoActivity, setListInfoActivity] = useState<[string, IActivityWithTime[]][]>([])

    //получение данных об выбранной активности
    useEffect(()=>{
        axios.get<IActivityWithTime[]>(`http://localhost:5000/activity/history/${idActivity}`)
        .then(({data})=>{
            setListInfoActivity(groupActivitiesByDate(data))})
    }, [idActivity])

  return (
    <div className={s.wrapper}>
      <header className={s.header}>
        <IoMdArrowRoundBack className={s.arrow_back} onClick={()=>navigate(-1)}/>
        <h2 className="title">История активности</h2>
      </header>
      
        {listInfoActivity.length ? 
          (<div className={s.container}>
            {listInfoActivity.map(item=>
              <ActivityItem key={item[0]} date={item[0]} infoActivity={item[1]}/>
            )}
          </div>)
        :
        <h3 className={s.text}>Пусто</h3>}
    </div>
  )
}

export default HistoryActivityPage