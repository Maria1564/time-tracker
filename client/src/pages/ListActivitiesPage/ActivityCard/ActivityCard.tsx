import React, { useEffect, useState } from "react"
import s from "./ActivityCard.module.scss"
import { IActivity, IColors } from "../../../interfaces"
import { BsThreeDotsVertical } from "react-icons/bs"
import ContextMenu from "../ContextMenu/ContextMenu"
import Modal from "../../../components/Modal/Modal"
import Button from "../../../components/Button/Button"
import { useAppDispatch } from "../../../hooks/hooksStore"
// import { editActivity } from "../../../store/slices/activitiesSlice"
import axios from "../../../axios"
import ColorItem from "../../NewActivityPage/ColorItem/ColorItem"

type ActivityCardProps = {
  activity: IActivity
  setActiveContextMenu: (idCard: null | number) => void
  showContextMenu: boolean
}

const ActivityCard: React.FC<ActivityCardProps> = React.memo(({ activity, setActiveContextMenu, showContextMenu }) => {

  const [openModal, setOpenModal] = useState<boolean>(false)
  const [colors, setColors] = useState<IColors[]>([])
  const [selectIdColor, setSelectIdColor] = useState<number>(1)
  
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
      console.log(selectIdColor)
    }, [selectIdColor])
  //закрыть модалку
  const handleCloseModal = () => {
    setOpenModal(false)
  }

  //отправка изменений на сервер
  const handleEditActivity = ()=> {
    console.log(activity)
    // const values = {

    //   idActivity: activity.id;
    //   nameActivity: activity.nameActivity;
    //   idColor: number;
    // }
    // dispatch(editActivity())
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
          <h2 className="title">Редактировать</h2>
          <form action="">
          <div>
          <label className={s.label}>Выбор цвета</label>
          <div className={s.box_colors}>
            {colors.map((item) => (
              <ColorItem
                isSelected={selectIdColor === item.id}
                key={item.id}
                setSelectedIdColor={setSelectIdColor}
                color={item}
              />
            ))}
          </div>
        </div>
            <div className={s.btns}>
              <Button className="btn_lite" type="button" onClick={handleCloseModal}>
                Отмена
              </Button>
              <Button type="button" onClick={handleEditActivity}>Ок</Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  )
})

export default ActivityCard
