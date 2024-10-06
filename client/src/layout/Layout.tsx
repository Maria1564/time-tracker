import React, { Suspense } from "react"
import { Outlet } from "react-router-dom"
import Navbar from "./Navbar/Navbar"
import s from "./Layout.module.scss"

const Layout: React.FC = () => {
  return (
    <div className={s.content}>
      <Navbar />
      <div className={s.outlet}>
        <Suspense fallback={<h2 className="loading">Загрузка...</h2>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  )
}

export default Layout
