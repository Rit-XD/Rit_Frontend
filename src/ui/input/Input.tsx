import {fromModule} from '@/utils/styler/Styler'
import React, {HTMLProps, useId} from 'react'
import css from './Input.module.scss'

const styles = fromModule(css)

export type InputType = HTMLProps<HTMLInputElement> & {
  label?: string
  error?: boolean
}

export const Input: React.FC<InputType> = ({
  label,
  type,
  className,
  error,
  placeholder,
  ...props
}) => {
  const id = useId()

  return (
    <input
      {...props}
      type={type}
      id={id}
      title={label}
      placeholder={placeholder || (props.required ? label + '*' : label)}
      className={styles.input()}
    />
  )
}
