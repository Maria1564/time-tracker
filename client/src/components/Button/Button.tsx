import React, { ReactNode, MouseEvent } from 'react'
import "./Button.scss"

type ButtonProps = {
    onClick?: (e: MouseEvent<HTMLButtonElement>, id?: number) => void;
    children: ReactNode;
    className?: string;
    [key: string]: unknown;
}

const Button: React.FC<ButtonProps> = ({onClick, children, className = "", ...rest}) => {
  return (
    <button className={`btn ${className}`} onClick={onClick} {...rest}>{children}</button>
  )
}

export default Button