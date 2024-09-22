import React from "react"
import { Outlet } from "react-router-dom"
import Navbar from "./Navbar/Navbar"
import s from "./Layout.module.scss"

type LayoutProps= {
  setShowModal:(status: boolean) => void
}

const Layout: React.FC<LayoutProps> = ({setShowModal}) => {
  return (
    <div className={s.content}>
      <Navbar setShowModal={setShowModal}/>
      <div className={s.outlet}>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
