import React, { ReactNode, MouseEvent, ButtonHTMLAttributes } from 'react'
import "./Button.scss"
import classNames from 'classnames';

type ButtonProps = {
    onClick?: (e: MouseEvent<HTMLButtonElement>, id?: number) => void;
    children: ReactNode;
    className?: string;
    secondary?: boolean
    [key: string]: unknown;
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<ButtonProps> = ({onClick, children, className = "", secondary, ...rest}) => {

  return (
    <button className={classNames("btn", {btn_lite: secondary}, className)} onClick={onClick} {...rest}>{children}</button>
  )
}

export default Button