import { useEffect, useState } from "react"
import { getActivities } from "../../store/slices/activitiesSlice"
import { useAppDispatch, useAppSelector } from "../../hooks/hooksStore"
import { IActivity } from "../../interfaces"
import s from "./HomePage.module.scss"
import Button from "../../components/Button/Button"
import { useNavigate } from "react-router-dom"
import ActivityCard from "./ActivityCard/ActivityCard"
import Modal from "../../components/Modal/Modal"
import Timer from "./Timer/Timer"
import axios from "../../axios"
import { octopusSticker, sadOctopusSticker } from "../../assets/"

const HomePage: React.FC = () => {
  const [activities, setActivities] = useState<IActivity[]>([])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [currentActivity, setCurrentActivity] = useState<IActivity | null>(null)
  const [topActivity, setTopActivity] = useState<{
    nameActivity: string
    minutes: number
    seconds: number
  } | null>(null)
  const dispatch = useAppDispatch()
  const listActivities = useAppSelector(
    (state) => state.activities.listActivities
  )
  const loading = useAppSelector((state) => state.activities.loading)
  const navigate = useNavigate()

  //Получение списка активностей
  useEffect(() => {
    dispatch(getActivities())
  }, [dispatch])

  useEffect(() => {
    setActivities(listActivities)
  }, [listActivities])

  //получение данных об активности дня
  useEffect(() => {
    if (!isModalOpen) {
      axios
        .get<{ nameactivity: string; secondsdiff: string }>(
          "http://localhost:5000/activity-day"
        )
        .then(
          ({ data }) =>
            data.nameactivity !== undefined &&
            setTopActivity({
              nameActivity: data.nameactivity,
              minutes: Math.floor(Number(data.secondsdiff) / 60),
              seconds: Number(data.secondsdiff) % 60,
            })
        )
    }
  }, [isModalOpen])

  if (loading) {
    return <h2 className="loading">Загрузка...</h2>
  }

  if (!loading && listActivities.length === 0) {
    return (
      <div className={s.page_empty}>
        <h2>У вас пока нет активностей</h2>
        <Button onClick={() => navigate("new-activity")}>
          Создать новую активность
        </Button>
      </div>
    )
  }

  return (
    <div className={s.home_wrapper}>
      <div className={s.list_activities}>
        <span className={s.title}>Ваши активности</span>
        {activities.map((elem) => (
          <ActivityCard
            key={elem.id}
            elem={elem}
            setIsModalOpen={setIsModalOpen}
            setCurrentActivity={setCurrentActivity}
          />
        ))}
      </div>
      <div className={s.top_activity}>
        <span className={s.title}>
          Активность дня{" "}
          <i className={s.today}>({new Date().toLocaleDateString()})</i>
        </span>
        <div className={s.wrapper_second}>
          {topActivity ? (
            <>
              <h2>{topActivity?.nameActivity}</h2>
              <h3 className={s.minutes}>
                {topActivity?.minutes} мин {topActivity.seconds} сек
              </h3>
              <img
                src={octopusSticker}
                alt="octopus sticker"
                width={150}
                height={150}
              />
            </>
          ) : (
            <>
              <h3>У вас пока что нет активности дня</h3>
              <img
                src={sadOctopusSticker}
                alt="sad octopus sticker"
                width={150}
                height={150}
              />
            </>
          )}
        </div>
      </div>

      {isModalOpen && currentActivity !== null && (
        <Modal>
          <Timer
            currentActivity={currentActivity}
            setIsModalOpen={setIsModalOpen}
          />
        </Modal>
      )}
    </div>
  )
}

export default HomePage
