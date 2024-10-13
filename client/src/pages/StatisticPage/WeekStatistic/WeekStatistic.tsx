import React, { useEffect, useState } from 'react'
import axios from "../../../axios"
import { Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  } from 'chart.js';
import { groupActivitiesByWeek } from '@/utils/helpers';
import { IDataActivities } from '@/interfaces';
import {getISOWeek, subWeeks} from "date-fns"

  ChartJS.register(
    CategoryScale,  
    LinearScale,  
    BarElement,   
    Title,           
    Tooltip,         
    Legend          
  );


const WeekStatistic: React.FC = () => {
    const [dataWeek, setDataWeek] = useState<IDataActivities>({})
    const [numberWeek,  setNumberWeek] = useState<number>(getISOWeek(new Date()))
    useEffect(()=>{
        axios.get("http://localhost:5000/activity-log/week",
          {
            params: {
              numWeek: numberWeek
            }
          }
        )
        .then(({data})=>setDataWeek(groupActivitiesByWeek(data)))
    }, [numberWeek])
    
    const datasets = Object.keys(dataWeek).map(activity => {
       const infoWeek = dataWeek[activity].week || []
       const arrTimes: number[]= []
       infoWeek?.map(infoDay => {
        console.log(infoDay)
        for(const key in infoDay){
            arrTimes.push(Number(`${infoDay[key].minutes}.${infoDay[key].seconds}`))
        }
    })
       return {
           label: activity,
           data: arrTimes,
           backgroundColor: dataWeek[activity].color    
       }
    });
    console.log(dataWeek)
    const data =  {
       
        labels: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
        datasets: Object.keys(dataWeek).length !== 0 ? datasets : [
            {
               label: "Ничего",
            data: [0, 0, 0, 0, 0, 0, 0],
            backgroundColor: "grey"  
            }
           
        ]
      };
  return (
    <>
    <Bar typeof = "bar" data= {data} />
    </>
  )
}

export default WeekStatistic