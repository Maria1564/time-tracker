import React, { useEffect, useState } from "react"
import s from "./StatisticPage.module.scss"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"
import axios from "../../axios"
import { IActivity } from "../../interfaces"
import DailyActivities from "./DailyActivities/DailyActivities"
import { formatDate } from "../../utils/helpers"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

ChartJS.register(ArcElement, Tooltip, Legend)

//тип для записях об активностях
export type logActivities = Omit<IActivity, "id"> & { minutes: string, seconds: string }

const StatisticPage: React.FC = () => {
  const [listLogActivity, setListLogActivity] = useState<logActivities[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [date, setDate] = useState<Date>(new Date())
  const [isToday, setIsToday] = useState<boolean>(true) 

  useEffect(() => {
    axios
      .get<logActivities[]>(
        "http://localhost:5000/activity-log",
        {params:{date: new Date().toLocaleDateString()}}
        // { params: { date: "17.08.2024" } }
      )
      .then(({ data }) => {
        setListLogActivity(data)
        setIsLoading(false)
      })
  }, [])

  useEffect(()=>{
    setIsToday(date.getDate() === new Date().getDate())

    axios
    .get<logActivities[]>(
      "http://localhost:5000/activity-log",
      { params: { date: date.toLocaleDateString() } }
    )
    .then(({ data }) => {
      setListLogActivity(data)
      setIsLoading(false)
    })

  }, [date])

  //переключение даты
  const toggleDate = (direction: "prev"|"next") => {
    const newDate: Date = new Date(date)
    if(direction === "prev") {
      newDate.setDate(date.getDate() - 1) 
    }else{
      newDate.setDate(date.getDate() + 1) 
    } 
    setDate(newDate)
  }


  const data = {
    labels: listLogActivity.map((log) => log.nameActivity),

    datasets: [
      {
        label: "минут",
        data: listLogActivity.map((log) => `${log.minutes}.${log.seconds}`),
        backgroundColor: listLogActivity.map((log) => log.hexcode),
        hoverOffset: 5,
        borderRadius: 8,
        borderColor: "#eee2ff",
      },
    ],
  }
  return (  
    <>
      <div className={s.wrapper}>
        <h2 className={s.title}>Статистика дня</h2>
        <div className={s.date_switcher}>
          
          <FaArrowLeft className={`${s.icon_arrow_right} ${s.icon}`} onClick={()=>toggleDate("prev")}/>
          <p className={s.date}>{formatDate(date)}</p>
          {!isToday && <FaArrowRight  className={`${s.icon_arrow_left} ${s.icon}`} onClick={()=>toggleDate("next")}/>}
        </div>
        {listLogActivity.length === 0 && isLoading === false ? (
          <p className={s.text}>Нет активностей</p>
        ) : (
          <>
            <div className={s.doughnut}>
              <Doughnut
                typeof="doughnut"
                data={data}
                options={{
                  plugins: {
                    legend: {
                      position: "bottom", 
                    },
                  },
                }}
              />
            </div>
          </>
        )}
      </div>
      {(listLogActivity.length && isLoading === false)  ?  <DailyActivities listActivities={listLogActivity}/> : ""}
    </>
  )
}

export default StatisticPage
