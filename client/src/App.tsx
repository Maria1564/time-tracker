
import { Routes, Route } from "react-router-dom"
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage"
import LoginPage from "./pages/LoginPage/LoginPage"
import Layout from "./components/Layout"
import { useAppDispatch } from "./hooks/hooksStore"
import { useEffect } from "react"
import { getInfoUser } from "./store/slices/userSlice"


const App = () => {
  const dispatch = useAppDispatch()
  useEffect(()=>{
    dispatch(getInfoUser())
  }, [dispatch])
  return (
    <>
      <Routes>
        <Route path="/reg" element={<RegistrationPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
      
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<h1>content</h1>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
