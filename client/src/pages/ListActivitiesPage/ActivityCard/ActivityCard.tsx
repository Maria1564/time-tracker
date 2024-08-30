import React, { useState } from "react"
import s from "./ActivityCard.module.scss"
import { IActivity } from "../../../interfaces"
import { BsThreeDotsVertical } from "react-icons/bs"
import ContextMenu from "../ContextMenu/ContextMenu"
import Modal from "../../../components/Modal/Modal"
import Button from "../../../components/Button/Button"

type ActivityCardProps = {
  activity: IActivity
  setActiveContextMenu: (idCard: null | number) => void
  showContextMenu: boolean
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  setActiveContextMenu,
  showContextMenu,
}) => {
  const [openModal, setOpenModal] = useState<boolean>(false)

  const handleClickOutside = (event: MouseEvent) => {
    const elem = event.target as Element
    if (elem && !elem.closest(`.${s.options}`)) {
      setActiveContextMenu(null)
    }
  }

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])

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
        <ContextMenu setOpenModal={setOpenModal} setActiveContextMenu={setActiveContextMenu}/>
      )}
    </div>
      {openModal && (
        <Modal>
          <h2 className="title">Редактировать</h2>
          <form action="">
            <div className={s.btns}>
              <Button className="btn_lite">Отмена</Button>
              <Button>Ок</Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  ) 
}

export default ActivityCard
