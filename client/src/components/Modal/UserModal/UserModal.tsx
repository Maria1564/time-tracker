import React, { useRef, useState } from "react"
import Modal from "../Modal"
import Button from "../../Button/Button"
import s from "./UserModal.module.scss"
import { FaRegCircleUser } from "react-icons/fa6"
import { useAppDispatch, useAppSelector } from "../../../hooks/hooksStore"
import { SubmitHandler, useForm } from "react-hook-form"
import axios from "@/axios"
import { AxiosError } from "axios"
import { changeInfoUser, updateUserAvatar } from "@/store/slices/userSlice"
import { REACT_APP_SERVER_URL } from "../../../../config"
import { useModal } from "@/hooks/customHooks"

type UserSettingsForm = {
  login: string
  oldPassword: string
  newPassword: string
}

interface VerifyPasswordResponse {
  success: boolean
}

const UserModal: React.FC = () => {
  const loginUser = useAppSelector((state) => state.user.infoUser?.login)
  const avatarUser = useAppSelector((state) => state.user.infoUser?.pathAvatar)
  const [validOldPassword, setValidOldPassword] = useState<boolean>(false)
  const [errorOldPassword, setErrorOldPassword] = useState<string>("")
  const [avatar, setAvatar] = useState<File | null>(null)
  const dispatch = useAppDispatch()
  const fileRef = useRef<HTMLImageElement | null>(null)

  const modalContext  = useModal()

  if(!modalContext) throw new Error("Navbar должен использоваться внутри UserModalProvider")
    
  const {closeModal} = modalContext

  const {register, handleSubmit, formState: { errors } } = useForm<UserSettingsForm>({
    defaultValues: {
      login: loginUser,
      oldPassword: "",
      newPassword: "",
    },
  })

  const submitChangeData: SubmitHandler<UserSettingsForm> = (data) => {
    const newInfoUser: { password?: string; login?: string } = {}

    if (validOldPassword || data.newPassword) {
      newInfoUser.password = data.newPassword
    }
    if (data.login !== loginUser) {
      newInfoUser.login = data.login
    }

    if (Object.keys(newInfoUser).length !== 0) {
      dispatch(changeInfoUser(newInfoUser))
      closeModal()
    }

    if (avatar) {
      const formData = new FormData()
      formData.append("avatar", avatar)
      dispatch(updateUserAvatar(formData))
      closeModal()
    }
  }

  const verifyOldPassword = (oldPassword: string) => {
    axios
      .post<VerifyPasswordResponse>(
        "http://localhost:5000/user/password/verify",
        { oldPassword }
      )
      .then(() => {
        setValidOldPassword(true)
        setErrorOldPassword("")
      })
      .catch((err: AxiosError) => {
        if (err.response) {
          const errorData = err.response.data as { message: string }
          setErrorOldPassword(errorData.message)
        }
      })
  }

  //изменение аватарки
  const handleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (e.target.files.length === 0) return
      const selectFile = e.target.files[0]
      setAvatar(selectFile)
      if (fileRef.current) {
        fileRef.current.src = URL.createObjectURL(selectFile) //временная ссылка на изображение
      }
    }
  }

  return (
    <Modal>
      <h2 className="title">Профиль</h2>
      <form action="" onSubmit={handleSubmit(submitChangeData)}>
        <div className={s.info_user}>
          <div className={s.box_avatar}>
            <input
              type="file"
              accept=".png, .jpg, .jpeg, .webp"
              name="avatar"
              id={s.avatar_input}
              onChange={(e) => handleChangeAvatar(e)}
            />
            <label htmlFor={s.avatar_input}>
              {avatarUser || avatar ? (
                <img
                  src={
                    avatarUser
                      ? `${REACT_APP_SERVER_URL}${avatarUser}`
                      : URL.createObjectURL(avatar as File)
                  }
                  alt="avatar"
                  className={s.avatar}
                  ref={fileRef}
                />
              ) : (
                <FaRegCircleUser className={s.temporary_avatar} />
              )}
            </label>
          </div>
          <div className={s.login}>
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
                    onBlur: (e) => {
                      verifyOldPassword(e.target.value)
                    },
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
            <Button className="btn_lite" onClick={() => closeModal()}>
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
