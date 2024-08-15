import React from 'react'
import Button from '../../../components/Button/Button'
import { IActivity } from '../../../interfaces';

type TimerProps = {
    currentActivity: IActivity;
    setIsModalOpen: (isOpen: boolean) => void
}

const Timer:React.FC<TimerProps> = ({currentActivity, setIsModalOpen}) => {

  return (
    <div>{currentActivity.nameActivity}
    <Button onClick={()=>setIsModalOpen(false)}>Закрыть</Button>
    </div>
  )
}

export default Timer