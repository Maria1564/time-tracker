import React, { useEffect, useState } from "react"
import s from "./DoughtChart.module.scss"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"
import axios from "../../../axios"
import { IActivity } from "../../../interfaces"

ChartJS.register(ArcElement, Tooltip, Legend)
type logActivities = Omit<IActivity, "id"> & { minutes: string }

const DoughnutChart: React.FC = () => {
  const [listLogActivity, setListLogActivity] = useState<logActivities[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  //тип для записях об активностях
  useEffect(() => {
    axios
      .get<logActivities[]>(
        "http://localhost:5000/activity-log",
        // {params:{data: new Date().toLocaleDateString()}})
        { params: { date: "16.08.2024" } }
      )
      .then(({ data }) => {
        setListLogActivity(data)
        setIsLoading(false)
      })
  }, [])

  const data = {
    labels: listLogActivity.map((log) => log.nameActivity),

    datasets: [
      {
        label: "минут",
        data: listLogActivity.map((log) => log.minutes),
        backgroundColor: listLogActivity.map((log) => log.hexcode),
        hoverOffset: 5,
        borderRadius: 8,
        borderColor: "#eee2ff",
      },
    ],
  }

  return (
    <div className={s.wrapper}>
      {/* Дата  */}
      <h2 className={s.title}>Статистика дня</h2>
      {listLogActivity.length === 0 && isLoading === false ? (
        <h1>Пусто</h1>
      ) : (
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
      )}
    </div>
  )
}

export default DoughnutChart
