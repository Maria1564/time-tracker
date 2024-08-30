import React, { FormEvent, useEffect, useState } from "react"
import s from "./ActivityCard.module.scss"
import { IActivity, IColors } from "../../../interfaces"
import { BsThreeDotsVertical } from "react-icons/bs"
import ContextMenu from "../ContextMenu/ContextMenu"
import Modal from "../../../components/Modal/Modal"
import Button from "../../../components/Button/Button"
import { useAppDispatch } from "../../../hooks/hooksStore"
import { editActivity } from "../../../store/slices/activitiesSlice"
import axios from "../../../axios"
import FormActivity from "../../../components/FormActivity/FormActivity"

type ActivityCardProps = {
  activity: IActivity
  setActiveContextMenu: (idCard: null | number) => void
  showContextMenu: boolean
}

const ActivityCard: React.FC<ActivityCardProps> = React.memo(({ activity, setActiveContextMenu, showContextMenu }) => {

  const [openModal, setOpenModal] = useState<boolean>(false)
  const [colors, setColors] = useState<IColors[]>([])
  const [selectIdColor, setSelectIdColor] = useState<number>(1)
  const [nameActivity, setNameActivity] = useState<string>(activity.nameActivity)
  
  const dispatch = useAppDispatch()

  const handleClickOutside = (event: MouseEvent) => {
    const elem = event.target as Element
    if (elem && !elem.closest(`.${s.options}`)) {
      setActiveContextMenu(null)
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])

  useEffect(()=>{
    axios
      .get<IColors[]>("http://localhost:5000/colors")
      .then(({ data }) => {
        setColors(data)
        
       const nowColorId =  data.filter(item=> item.hexcode === activity.hexcode)[0].id
       setSelectIdColor(nowColorId)
      })
    }, [activity])
    
    useEffect(()=>{
  }, [selectIdColor])
    
  //закрыть модалку
  const handleCloseModal = () => {
    const nowColorId =  colors.filter(item=> item.hexcode === activity.hexcode)[0].id
    setSelectIdColor(nowColorId)
    setNameActivity(activity.nameActivity)
    setOpenModal(false)

  }

  //отправка измененной информации об активности на сервер
  const handleEditActivity = (e: FormEvent<HTMLFormElement>)=> {
    console.log(activity)
    e.preventDefault()

    const values = {

      idActivity: activity.id,
      nameNewActivity: nameActivity,
      idColor: selectIdColor
    }
    dispatch(editActivity(values))
    setOpenModal(false)
  }
  
  return (
    <>
      <div className={s.card}>
        <div
          className={s.triangle}
          style={{ background: `${activity.hexcode}` }}
        ></div>
        <BsThreeDotsVertical
          className={s.options}
          onClick={() => setActiveContextMenu(activity.id)}
        />
        <h3>{activity.nameActivity}</h3>
        {showContextMenu && (
          <ContextMenu
            setOpenModal={setOpenModal}
            setActiveContextMenu={setActiveContextMenu}
          />
        )}
      </div>

      {openModal && (
        <Modal>
          <FormActivity
            titleForm="Редактировать"
            value={nameActivity}
            colors={colors}
            selectIdColor={selectIdColor}
            setSelectedIdColor={setSelectIdColor}
            handleSubmit={handleEditActivity}
            handleChange={(e)=>setNameActivity(e.currentTarget.value)}
            customStyle={{position: "static", transform:"none", padding: 0, boxShadow: "none", width: "90%"}}
          >
            <div className={s.btns}>
                <Button className="btn_lite" type="button" onClick={handleCloseModal}>
                  Отмена
                </Button>
                <Button type="submit">Ок</Button>
              </div>
          </FormActivity>
        </Modal>
      )}
    </>
  )
})

export default ActivityCard
