
import { Routes, Route } from "react-router-dom"
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage"


const App = () => {
  
  return (
    <>
      <Routes>
        <Route path="/reg" element={<RegistrationPage/>}/>
        {/* <Route path="/login" element={<FormReLogin/>}/>
        <Route path="/" element={<Layout />}>
        
        <Route/> */}
      </Routes>
    </>
  )
}

export default App
