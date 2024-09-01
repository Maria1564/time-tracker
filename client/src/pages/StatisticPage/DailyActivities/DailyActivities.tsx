import React from 'react'
import s from "./DailyActivities.module.scss"
import { logActivities } from '../StatisticPage'
import ActivityEntry from './ActivityEntry/ActivityEntry'

type DailyActivitiesProps = {
  listActivities: logActivities[]
}

const DailyActivities: React.FC<DailyActivitiesProps> = ({listActivities}) => {

  console.log("listActivities", listActivities)
  return (
    <div className={s.list}>
      {listActivities.map((elem, index)=> (
        <ActivityEntry key={index} activity={elem}/>
      ))}
    </div>
  )
}

export default DailyActivities