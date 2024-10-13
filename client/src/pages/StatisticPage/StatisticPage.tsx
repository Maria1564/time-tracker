import React from "react"
import s from "./StatisticPage.module.scss"
import { Link, Outlet } from "react-router-dom"

const StatisticPage: React.FC = () => {


  return (  
   
      <div className={s.wrapper}>
        <Link to="day">Статистика дня</Link> 
        <Link to="week">Статистика недели</Link> 
        <Outlet/>
      </div>
    
  )
}

export default StatisticPage
