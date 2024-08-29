import React, { } from "react"
import s from "./ActivityCard.module.scss"
import { IActivity } from "../../../interfaces"
import { BsThreeDotsVertical } from "react-icons/bs"

type ActivityCardProps = {
  activity: IActivity;
  setActiveContextMenu: (idCard: null| number) => void
  showContextMenu: boolean
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, setActiveContextMenu, showContextMenu}) => {

  return (
    <>
      <div className={s.card} onClick={()=>showContextMenu && setActiveContextMenu(null)}>
        <div
          className={s.triangle}
          style={{ background: `${activity.hexcode}` }}
        ></div>
        <BsThreeDotsVertical className={s.options} onClick={() => setActiveContextMenu(activity.id)}/>
        <h3>{activity.nameActivity}</h3>
      </div>
      {showContextMenu && "Menu"}
    </>
  )
}

export default ActivityCard
