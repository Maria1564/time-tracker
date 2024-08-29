import React, { ChangeEvent, FormEvent, useEffect, useState } from "react"
import s from "./NewActivityPage.module.scss"
import Input from "../../components/Input/Input"
import axios from "../../axios"
import { IColors } from "../../interfaces"
import ColorItem from "./ColorItem/ColorItem"
import Button from "../../components/Button/Button"
import { useAppDispatch } from "../../hooks/hooksStore"
import { createNewActivity } from "../../store/slices/activitiesSlice"

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
      <form className={s.wrapper} onSubmit={(e) => handleCreateNewActivity(e)}>
        <h2 className="title">Создать активность</h2>
        <div className={s.about_activity}>
          <label className={s.label}>Название</label>
          <Input
            type="text"
            name="activity"
            id={s.new_activity}
            required
            minLength={3}
            maxLength={50}
            value={activity}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setActivity(e.currentTarget.value)
            }
          />
        </div>
        <div>
          <label className={s.label}>Выбор цвета</label>
          <div className={s.box_colors}>
            {colors.map((item) => (
              <ColorItem
                isSelected={selectedIdColor === item.id}
                key={item.id}
                setSelectedIdColor={setSelectedIdColor}
                color={item}
              />
            ))}
          </div>
        </div>

        <Button type="submit">Создать</Button>
      </form>
    </section>
  )
}

export default NewActivityPage
