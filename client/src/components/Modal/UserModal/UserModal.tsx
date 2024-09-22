import React, { useState } from "react"
import Modal from "../Modal"
import Button from "../../Button/Button"
import s from "./UserModal.module.scss"
import { FaRegCircleUser } from "react-icons/fa6"
import { useAppDispatch, useAppSelector } from "../../../hooks/hooksStore"
import { SubmitHandler, useForm } from "react-hook-form"
import axios from "@/axios"
import { AxiosError } from "axios"
import { changeInfoUser } from "@/store/slices/userSlice"

type UserModalProps = {
  setShowModal: (status: boolean) => void
}

type UserSettingsForm = {
  login: string
  oldPassword: string
  newPassword: string
}

interface VerifyPasswordResponse {
  success: boolean
}

const UserModal: React.FC<UserModalProps> = ({ setShowModal }) => {
  const loginUser = useAppSelector((state) => state.user.infoUser?.login)
  const [validOldPassword, setValidOldPassword] = useState<boolean>(false)
  const [errorOldPassword, setErrorOldPassword] = useState<string>("")
  const dispatch = useAppDispatch()

  const {register, handleSubmit, formState: { errors }} = useForm<UserSettingsForm>({
    defaultValues: {
      login: loginUser,
      oldPassword: "",
      newPassword: "",
    },
  })

  const submitChangeData: SubmitHandler<UserSettingsForm> = (data) => {
    const newInfoUser: {password?: string, login?: string} = {}

    if(validOldPassword || data.newPassword){
      newInfoUser.password = data.newPassword
    }
    if(data.login !== loginUser){
      newInfoUser.login = data.login
    }

    if(Object.keys(newInfoUser).length !== 0){
      dispatch(changeInfoUser(newInfoUser))
      setShowModal(false)
    }

  }

  const verifyOldPassword = (oldPassword: string) => {
    axios
    .post<VerifyPasswordResponse>(
      "http://localhost:5000/user/password/verify",
      { oldPassword}
    )
    .then(({ data }) => {
      console.log(data.success)
      setValidOldPassword(true)
      setErrorOldPassword("")
    })
    .catch((err: AxiosError) => {
      if (err.response) {
        const errorData = err.response.data as { message: string }
        console.log("err >> ", errorData.message)
        setErrorOldPassword(errorData.message)
      }
    })
  }

  return (
    <Modal>
      <h2 className="title">Профиль</h2>
      <form action="" onSubmit={handleSubmit(submitChangeData)}>
        <div className={s.info_user}>
          <FaRegCircleUser className={s.logo} />
          <div className={s.label_login}>
            <label htmlFor="">
              Логин:
              <input
                className="inp"
                type="text"
                id="login"
                placeholder="логин"
                {...register("login", { required: true })}
              />
            </label>
            {errors?.login && (
              <span className={`error ${s.modal_error}`}>Введите логин</span>
            )}
          </div>

          <div className={s.inputs_password}>
            <div className={s.box_inp_old_pass}>
              <label htmlFor="old_password">
                Пароль:
                <input
                  className="inp"
                  type="password"
                  id="old_password"
                  {...register("oldPassword", {
                    onBlur: (e)=>{verifyOldPassword(e.target.value)}
                  })}
                  placeholder="старый пароль"
                  
                />
                {errorOldPassword && (
                  <span className={`error ${s.modal_error}`}>
                    {errorOldPassword}
                  </span>
                )}
              </label>
            </div>
            {validOldPassword && (
              <div className={s.box_inp_new_pass}>
                <input
                  className="inp"
                  type="password"
                  id="new_password"
                  placeholder="новый пароль"
                  {...register("newPassword", { required: true })}
                />
                {errors?.newPassword && (
                  <span className={`error ${s.modal_error}`}>
                    Введите новый пароль
                  </span>
                )}
              </div>
            )}
          </div>
          <div className={s.btns}>
            <Button className="btn_lite" onClick={() => setShowModal(false)}>
              Отмена
            </Button>
            <Button type="submit">Сохранить</Button>
          </div>
        </div>
      </form>
    </Modal>
  )
}

export default UserModal
