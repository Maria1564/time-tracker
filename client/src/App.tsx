
import { Routes, Route } from "react-router-dom"
// import LoginPage from "./pages/LoginPage/LoginPage"
import Layout from "./layout/Layout"
import { useAppDispatch, useAppSelector } from "./hooks/hooksStore"
import { lazy, Suspense, useEffect} from "react"
import { getInfoUser } from "./store/slices/userSlice"
import PrivateRoute from "./utils/router/PrivateRoute"
import UserModal from "./components/Modal/UserModal/UserModal"
import { useModal } from "./hooks/customHooks"
import React from "react"

const HomePage = lazy(()=>import("./pages/HomePage/HomePage"))
const NewActivityPage = lazy(()=>import( "./pages/NewActivityPage/NewActivityPage"))
const StatisticPage = lazy(()=>import( "./pages/StatisticPage/StatisticPage"))
const ListActivitiesPage = lazy(()=>import("./pages/ListActivitiesPage/ListActivitiesPage"))
const HistoryActivityPage = lazy(()=>import("./pages/HistoryActivityPage/HistoryActivityPage"))
const NotFoundPage = lazy(()=>import("./pages/NotFoundPage/NotFoundPage"))
const DayStatistic = lazy(()=>import("./pages//StatisticPage/DayStatistic/DayStatistic"))
const WeekStatistic = lazy(()=>import("./pages//StatisticPage/WeekStatistic/WeekStatistic"))
const LoginPage = lazy(()=>import("./pages/LoginPage/LoginPage"))
const RegistrationPage = lazy(()=>import("./pages/RegistrationPage/RegistrationPage"))

const App = () => {
  const isAuth = useAppSelector(state => state.user.isAuth)
  // const loading = useAppSelector(state => state.user.loading)
  console.log("app")
  const modalContext  = useModal()

  if(!modalContext) throw new Error("Navbar должен использоваться внутри UserModalProvider")

  const {showModal} = modalContext
    
  // console.log(isAuth)
  const dispatch = useAppDispatch()

  useEffect(()=>{
    dispatch(getInfoUser())
  }, [dispatch])



  return (
    <>
      <Suspense fallback={<h2 className="loading">Загрузка...</h2>}>
        <Routes>
          <Route element={<PrivateRoute isAuth={isAuth}/>}>
            <Route path="/" element={<Layout/>}>
              <Route index element={<HomePage/>}/>
              <Route path="new-activity" element={<NewActivityPage/>}/>
              <Route path="statistic/" element={<StatisticPage/>}>
                <Route path="day" element={<DayStatistic/>}/>
                <Route path="week" element={<WeekStatistic/>}/>
              </Route>
              <Route path="activity-list" element={<ListActivitiesPage/>}/>
              <Route path="activity-list/history/:id" element={<HistoryActivityPage/>}/>
              <Route path="*" element={<NotFoundPage/>}/>
            </Route>
          </Route>

          <Route path="/reg" element={<RegistrationPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
        </Routes>
      </Suspense>
      {showModal && <UserModal/>}
    </>
  )
}

export default App
