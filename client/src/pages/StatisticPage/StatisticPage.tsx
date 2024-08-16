import React from 'react'
import DoughnutChart from './DoughnutChart/DoughnutChart'
import DailyActivities from './DailyActivities/DailyActivities'


const StatisticPage: React.FC = () => {
  return (
    <>
      <DoughnutChart/>
      <DailyActivities/>
    </>
  )
}

export default StatisticPage