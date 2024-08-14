import React from 'react'
import { IColors } from '../../../interfaces';
import s from "./ColorItem.module.scss"

type ItemProps = {
    isSelected: boolean
    setSelectedIdColor: (idColor: number) => void;
    color: IColors;
}

const ColorItem: React.FC<ItemProps> =React.memo(({setSelectedIdColor, isSelected,  color}) => {
    // console.log(color)
  return (
    <div className={s.wrapper_item}  onClick={()=> setSelectedIdColor(color.id)}>
        <div className={`${s.item} ${isSelected ? s.active: ""}`}  style={{backgroundColor: `${color.hexcode}`}}></div>
        <span className={`${s.name} ${isSelected ? s.active: ""}`}>{color.namecolor}</span>
    </div>
  )
})

export default ColorItem