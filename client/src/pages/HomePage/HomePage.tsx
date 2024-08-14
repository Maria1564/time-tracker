import React, { useEffect, useState} from 'react'
import { getActivities } from '../../store/slices/activitiesSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/hooksStore'
import { IActivity } from '../../interfaces'

const HomePage = () => {
    const [activities, setActivities]  = useState<IActivity[]>([])
    const dispatch = useAppDispatch()
    const listActivities = useAppSelector(state => state.activities.listActivities)
    const loading = useAppSelector(state => state.activities.loading)

    //Получение списка активностей
    useEffect(()=>{
        dispatch(getActivities())
    }, [dispatch])

    useEffect(()=>{
        setActivities(listActivities)
        console.log(listActivities)
        
    }, [listActivities])
    if(loading){
        return  <h2 className="loading">Загрузка...</h2>
    }
      
  return (
    <div>{
        activities.map(elem => (
            <div key={elem.id}>
                <p style={{color: elem.hexcode}}>{elem.nameActivity}</p>
            </div>
        ))
        }</div>
  )
}

export default HomePage

