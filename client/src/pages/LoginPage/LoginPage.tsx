import React, { FormEvent, useEffect} from 'react'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import { Link, Navigate } from 'react-router-dom'
import s from "../RegistrationPage/FormStyle.module.scss"
import sLogin from "./Login.module.scss"
import { useAppDispatch, useAppSelector } from '../../hooks/hooksStore'
import { clearError, loginUser } from '../../store/slices/userSlice'

const LoginPage: React.FC = () => {
  const isAuth = useAppSelector(state => state.user.isAuth)
  const error = useAppSelector(state => state.user.error)
  const dispatch = useAppDispatch()

  useEffect(()=>{
    return ()=> {
      dispatch(clearError(null))
    }
  },[dispatch])

  if(isAuth)  {
    return <Navigate to="/"/>
  }
  

  //Вход в аккаунт
  const handleLogin = (e:FormEvent<HTMLFormElement> ): void =>  {
    e.preventDefault()

    const formLogin = new FormData(e.currentTarget)

    if((formLogin.get("login") as string).trim() == "" ||  (formLogin.get("password") as string).trim() == ""){
      alert("Корректно заполните поля")
      return 
    }
    const dataUser = {
        login: (formLogin.get("login") as string).trim(),
        password: (formLogin.get("password") as string).trim()
    }

    dispatch(loginUser(dataUser))
  }

  return (
    <>
      <div className={sLogin.log_pg}>
        <div className="container">
            <div className={s.wrapper}>
                <h1 className='title'>Вход</h1>
                <form action="" onSubmit={(e)=> handleLogin(e)}>
                    <Input type="text" name="login" id="login" placeholder='логин' required minLength={3} maxLength={20}/>
                    <Input type="password" name="password" id="password" placeholder='пароль' required minLength={5}/>
                    <Button type="submit">Войти</Button>
                    {error && <h4 className='error'>{error}</h4>}
                </form>
                <Link to="/reg">Регистрация</Link>
            </div>
        </div>
    </div>


    </>
  )
}

export default LoginPage