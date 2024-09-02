import React from "react"
import { IActivityWithTime } from "../../../interfaces"
import s from "./ActivityItem.module.scss"

type ActivityItemProps = {
  infoActivity: IActivityWithTime[];
  date: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ infoActivity, date }) => {
  return (
    <div  className={s.wrapper}>
      <span className={s.circle}></span>
      <span className={s.date}>{date}</span>
      {infoActivity.map((item) => (
        <div key={item.id} className={s.card}>
          <span className={s.name}>{item.nameActivity}</span>
          <span className={s.time}>{item.startTime} - {item.endTime}</span>
           
        </div>
      ))}
    </div>
  )
}

export default ActivityItem
