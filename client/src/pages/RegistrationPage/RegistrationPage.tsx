import { FC, FormEvent, useEffect } from 'react'
import { registerUser } from '../../store/slices/userSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/hooksStore'
import { useNavigate } from 'react-router-dom'

const RegistrationPage:FC = () => {
    const dispatch = useAppDispatch()
    const error = useAppSelector(state => state.user.error)
    const infoUser = useAppSelector(state => state.user.infoUser)
    const navigate = useNavigate()


    useEffect(()=>{
        if (!error && infoUser) {
            navigate('/login', { replace: true });
        }
        if(error){
            alert(error)
        }
        

    }, [error, infoUser, navigate])

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
    <div className="reg_pg">
        <div className="container">
            <div className="wrapper">
                <h1 className='title'>Создать аккаунт</h1>
                <form action="" onSubmit={(e)=> registerNewUser(e)}>
                    <input type="text" name="login" id="login" placeholder='логин' required minLength={3} maxLength={20}/>
                    <input type="email" name="email" id="email" placeholder='эл. почта' required />
                    <input type="password" name="password" id="password" placeholder='пароль' required minLength={5}/>
                    <button>Зарегистрироваться</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default RegistrationPage