import React, { ChangeEvent, FormEvent, ReactNode } from 'react'
import Input from '../Input/Input';
import ColorItem from '../../pages/NewActivityPage/ColorItem/ColorItem';
import s from "./FormActivity.module.scss"
import { IColors } from '../../interfaces';

type FormActivityProps = {
  children: ReactNode;
  titleForm: string;
  value: string;
  colors: IColors[];
  selectIdColor: number;
  setSelectedIdColor: (id: number ) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FormActivity: React.FC<FormActivityProps>= ({children, titleForm, value, colors, selectIdColor, handleSubmit, handleChange, setSelectedIdColor}) => {
  return (
    <form className={s.wrapper} onSubmit={(e) => handleSubmit(e)}>
        <h2 className="title">{titleForm}</h2>
        <div className={s.about_activity}>
          <label className={s.label}>Название</label>
          <Input
            type="text"
            name="activity"
            id={s.new_activity}
            required
            minLength={3}
            maxLength={50}
            value={value}
            onChange={(e:ChangeEvent<HTMLInputElement> )=>handleChange(e)}
          />
        </div>
        <div>
          <label className={s.label}>Выбор цвета</label>
          <div className={s.box_colors}>
            {colors.map((item) => (
              <ColorItem
                isSelected={selectIdColor === item.id}
                key={item.id}
                setSelectedIdColor={setSelectedIdColor}
                color={item}
              />
            ))}
          </div>
        </div>

        {children}
      </form>
  )
}

export default FormActivity
