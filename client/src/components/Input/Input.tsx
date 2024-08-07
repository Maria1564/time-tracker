import React from 'react'
import "./Input.scss"

type InputProps = {
    type: string;
    name: string,
    id: string,
    required?: boolean
    [key: string]: unknown
}

const Input:React.FC<InputProps> = ({type, name, id, required = true, ...rest}) => {
  return (
    <input className="inp" type={type} name={name} id={id} required={required} {...rest}/>
  )
}

export default Input