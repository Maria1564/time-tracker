import React from "react"
import { Outlet } from "react-router-dom"
import Navbar from "./Navbar/Navbar"
import s from "./Layout.module.scss"



const Layout: React.FC = () => {
  return (
    <div className={s.content}>
      <Navbar/>
      <div className={s.outlet}>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
