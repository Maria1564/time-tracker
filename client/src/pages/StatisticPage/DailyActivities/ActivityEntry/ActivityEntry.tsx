import React from 'react'
import s from "../../../HomePage/ActivityCard/ActivityCard.module.scss"
import s_main from"./ActivityEntry.module.scss"
import { logActivities } from '@/interfaces'

type ActivityEntryProps = {
  activity: logActivities
}

const ActivityEntry: React.FC<ActivityEntryProps> = ({activity}) => {
  console.log("activity", activity)
  return (
    <div className={`${s.wrapper} ${s_main.wrapper}`}>
        <div className={s.color_elem} style={{backgroundColor: activity.hexcode}}></div>
        <p>{activity.nameActivity}</p>
        <div className={s_main.time}>
          <span className={s_main.minute}> {Math.round(Number(activity.minutes))} мин</span> 
          <span className={s_main.seconds}>{activity.seconds} сек</span>
        </div>
    </div>
  )
}

export default ActivityEntry