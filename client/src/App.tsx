
import { Routes, Route } from "react-router-dom"
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage"
import LoginPage from "./pages/LoginPage/LoginPage"
import Layout from "./components/Layout"
import { useAppDispatch, useAppSelector } from "./hooks/hooksStore"
import { useEffect } from "react"
import { getInfoUser } from "./store/slices/userSlice"
import PrivateRoute from "./utils/router/PrivateRoute"


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
            <Route index path="/" element={<h1>content</h1>}/>
          </Route>
        </Route>

        <Route path="/reg" element={<RegistrationPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
      
        
      </Routes>
    </>
  )
}

export default App
