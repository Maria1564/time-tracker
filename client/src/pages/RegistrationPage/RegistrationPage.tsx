import React, { FormEvent, useEffect } from 'react'
import { clearError, registerUser } from '../../store/slices/userSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/hooksStore'
import { Link, useNavigate } from 'react-router-dom'

import s from "./FormStyle.module.scss"
import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'

const RegistrationPage:React.FC = () => {
    const dispatch = useAppDispatch()
    const error = useAppSelector(state => state.user.error)
    const infoUser = useAppSelector(state => state.user.infoUser)
    const navigate = useNavigate()


    useEffect(()=>{
        if (!error && infoUser) {
            navigate('/login', { replace: true });
        }
        
    }, [error, infoUser, navigate])

    useEffect(()=>{
        return ()=> {
          dispatch(clearError(null))
        }
      },[dispatch])

    const registerNewUser = (e:FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        const dataForm = new FormData(e.currentTarget)
   
        if((dataForm.get("login") as string).trim() == "" ||  (dataForm.get("password") as string).trim() == ""){
            alert("Корректно заполните поля")
            return 
        }
        const newUser = {
            login: (dataForm.get("login") as string).trim(),
            email:  (dataForm.get("email") as string).trim(),
            password: (dataForm.get("password") as string).trim()
        }

        dispatch(registerUser(newUser))
    }

  return (
    <div className={s.reg_pg}>
        <div className="container">
            <div className={s.wrapper}>
                <h1 className='title'>Создать аккаунт</h1>
                <form action="" onSubmit={(e)=> registerNewUser(e)}>
                    <Input type="text" name="login" id="login" placeholder='логин' required minLength={3} maxLength={20}/>
                    <Input type="email" name="email" id="email" placeholder='эл. почта' required />
                    <Input type="password" name="password" id="password" placeholder='пароль' required minLength={5}/>
                    <Button>Зарегистрироваться</Button>
                    {error && <h4 className='error'>{error}</h4>}
                </form>
                <Link to="/login">Войти</Link>
            </div>
        </div>
    </div>
  )
}

export default RegistrationPage