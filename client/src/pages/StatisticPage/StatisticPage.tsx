import React from "react"
import s from "./StatisticPage.module.scss"
import {NavLink, Outlet } from "react-router-dom"

type FuncActiveLink = ({ isActive }: { isActive: boolean }) => string
const setActiveLink: FuncActiveLink= ({isActive})=> isActive ? s.active_link : ""

const StatisticPage: React.FC = () => {


  return (  
   
      <div className={s.wrapper}>
        <nav className={s.nav}>
        <NavLink to="day" className={setActiveLink}>Статистика дня</NavLink> 
        <NavLink to="week"className={setActiveLink}>Статистика недели</NavLink> 
        </nav>
        <Outlet/>
      </div>
    
  )
}

export default StatisticPage
