import React, { FormEvent, useEffect, useState } from "react"
import s from "./NewActivityPage.module.scss"
import axios from "../../axios"
import { IColors } from "../../interfaces"
import Button from "../../components/Button/Button"
import { useAppDispatch } from "../../hooks/hooksStore"
import { createNewActivity } from "../../store/slices/activitiesSlice"
import FormActivity from "../../components/FormActivity/FormActivity"

const NewActivityPage: React.FC = () => {
  interface INewActivity {
    idColor: number
    nameNewActivity: string
  }

  const [colors, setColors] = useState<IColors[]>([])
  const [selectedIdColor, setSelectedIdColor] = useState<number>(1)
  const [activity, setActivity] = useState<string>("")

  const dispatch = useAppDispatch()

  useEffect(() => {
    axios
      .get<IColors[]>("http://localhost:5000/colors")
      .then(({ data }) => setColors(data))
  }, [])

  //отправка данных о новой активности
  const handleCreateNewActivity = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const dataNewActivity = new FormData(e.currentTarget)
    const nameActiv = (dataNewActivity.get("activity") as string).trim()
    const newActivity: INewActivity = {
      idColor: selectedIdColor,
      nameNewActivity: nameActiv,
    }

    dispatch(createNewActivity(newActivity))
    setActivity("")
    setSelectedIdColor(1)
  }

  return (
    <section className={s.new_activity}>
      <FormActivity
        titleForm="Создать активность"
        value={activity}
        colors={colors}
        selectIdColor={selectedIdColor}
        setSelectedIdColor={setSelectedIdColor}
        handleSubmit={handleCreateNewActivity}
        handleChange={(e)=>setActivity(e.currentTarget.value)}
      >
        <Button type="submit">Создать</Button>
      </FormActivity>
    </section>
  )
}

export default NewActivityPage
