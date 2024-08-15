import { useEffect, useState} from 'react'
import { getActivities } from '../../store/slices/activitiesSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/hooksStore'
import { IActivity } from '../../interfaces'
import s from "./HomePage.module.scss"
import Button from '../../components/Button/Button'
import { useNavigate } from 'react-router-dom'
import ActivityCard from './ActivityCard/ActivityCard'
import Modal from '../../components/Modal/Modal'
import Timer from './Timer/Timer'

const HomePage = () => {
    const [activities, setActivities]  = useState<IActivity[]>([])
    const [isModalOpen, setIsModalOpen] = useState<boolean>(true)
    const [currentActivity, setCurrentActivity] = useState<IActivity | null>(null)
    const dispatch = useAppDispatch()   
    const listActivities = useAppSelector(state => state.activities.listActivities)
    const loading = useAppSelector(state => state.activities.loading)
    const navigate = useNavigate()

    //Получение списка активностей
    useEffect(()=>{
        dispatch(getActivities())
    }, [dispatch])

    useEffect(()=>{
        setActivities(listActivities)
        
    }, [listActivities])

    if(loading){
        return  <h2 className="loading">Загрузка...</h2>
    }

    if(!loading && listActivities.length === 0){
        return (
            <div className={s.page_empty}>
                <h2>У вас пока нет активностей</h2>
                <Button onClick={()=> navigate("new-activity") }>Создать новую активность</Button>
            </div>
        )
    }
      
  return (
    <div className={s.home_wrapper}>
        <div className={s.list_activities}>
            <span className={s.title}>Ваши активности</span>
            {activities.map(elem => (
                <ActivityCard 
                key={elem.id} 
                elem={elem}
                setIsModalOpen={setIsModalOpen}
                setCurrentActivity={setCurrentActivity}
                />
            ))}

        </div>
        <div className={s.top_activities}>
            <span className={s.title}>Топ активностей за неделю</span>
        </div>
            
        {(isModalOpen && currentActivity !== null) && <Modal>
                <Timer currentActivity={currentActivity} setIsModalOpen={setIsModalOpen}/>
            </Modal>}
    </div>
  )
}

export default HomePage

