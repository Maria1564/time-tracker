import { useEffect, useState } from "react"
import s from "./ListActivitiesPage.module.scss"
import { IActivity } from "../../interfaces"
import { useAppDispatch, useAppSelector } from "../../hooks/hooksStore"
import { getActivities } from "../../store/slices/activitiesSlice"
import Button from "../../components/Button/Button"
import { useNavigate } from "react-router-dom"
import ActivityCard from "./ActivityCard/ActivityCard"

const ListActivitiesPage = () => {
  const [activities, setActivities] = useState<IActivity[]>([])
  const [activeContextMenu, setActiveContextMenu] = useState<number | null>(null)

  const loading = useAppSelector((state) => state.activities.loading)
  const listActiv = useAppSelector((state) => state.activities.listActivities)
  const error = useAppSelector((state) => state.activities.error)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getActivities())
  }, [dispatch])

  useEffect(() => {
    if (!loading) {
      setActivities(listActiv)
    }
  }, [listActiv, loading])

  //Открытие контекстного меню
  const handleRightClick = (event: React.MouseEvent<SVGElement, MouseEvent>, cardId: number) => {
    event.preventDefault()
    setActiveContextMenu(cardId)
  }

  if (!loading && error) {
    return <h3>Не удалось получить список</h3>
  }

  if (loading) {
    return <h2 className="loading">Загрузка...</h2>
  }
  console.log(activeContextMenu)
  return (
    <div className={s.wrapper}>
      {activities.length && !loading ? (
        <>
          <h2 className="title">Управление активностями</h2>
          <div className={s.list_activities}>
            {activities.map((elem) => (
              <ActivityCard
                key={elem.id}
                activity={elem}
                handleRightClick={handleRightClick}
                setActiveContextMenu={setActiveContextMenu}
                showContextMenu={activeContextMenu === elem.id}
              />
            ))}
          </div>
        </>
      ) : (
        <div className={s.page_empty}>
          <h2>У вас пока нет активностей</h2>
          <Button onClick={() => navigate("/new-activity")}>
            Создать новую активность
          </Button>
        </div>
      )}
    </div>
  )
}

export default ListActivitiesPage
