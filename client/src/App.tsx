
import { Routes, Route, Navigate } from "react-router-dom"
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage"
import LoginPage from "./pages/LoginPage/LoginPage"
import Layout from "./layout/Layout"
import { useAppDispatch, useAppSelector } from "./hooks/hooksStore"
import { useEffect } from "react"
import { getInfoUser } from "./store/slices/userSlice"
import PrivateRoute from "./utils/router/PrivateRoute"
import NewActivityPage from "./pages/NewActivityPage/NewActivityPage"
import StatisticPage from "./pages/StatisticPage/StatisticPage"
import ListActivitiesPage from "./pages/ListActivitiesPage/ListActivitiesPage"


const App = () => {
  const isAuth = useAppSelector(state => state.user.isAuth)
  const loading = useAppSelector(state => state.user.loading)

  console.log(isAuth)
  const dispatch = useAppDispatch()

  useEffect(()=>{
    dispatch(getInfoUser())
  }, [dispatch])

  if(loading) {
    return  <h2 className="loading">Загрузка...</h2>
  }

  return (
    <>
      <Routes>
        <Route element={<PrivateRoute isAuth={isAuth}/>}>
          <Route path="/" element={<Layout />}>
            <Route index  element={<Navigate to="new-activity"/>}/>
            <Route  path="new-activity" element={<NewActivityPage/>}/>
            <Route  path="statistic" element={<StatisticPage/>}/>
            <Route  path="activity-list" element={<ListActivitiesPage/>}/>
          </Route>
        </Route>

        <Route path="/reg" element={<RegistrationPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
      
        
      </Routes>
    </>
  )
}

export default App
