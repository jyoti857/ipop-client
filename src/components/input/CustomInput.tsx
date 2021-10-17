import clsx from 'clsx';
import React, { ReactElement } from 'react'
import { useStyles } from './styles'

interface Props {
  handleChange?: any;
  value: string | number;
  name: string;
  type: string;
  placeholder: string;
  style?: any;
  classNames?: any;
}

function CustomInput({ placeholder, name, type, handleChange, value, style, classNames }: Props): ReactElement {
  const classes = useStyles();
  return (
    <input
      name={name}
      type={type}
      onChange={handleChange}
      value={value}
      className={clsx(classes.inputTextField, classNames)}
      placeholder={placeholder}
      style={style}
    />
  )
}

export default CustomInput
