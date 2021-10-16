import React, { ReactElement } from 'react'
import { useStyles } from './styles'

interface Props {
  handleChange: any;
  value: string | number;
  name: string;
  type: string;
  placeholder: string;
  style?: any
}

function CustomInput({ placeholder, name, type, handleChange, value, style }: Props): ReactElement {
  const classes = useStyles();
  return (
    <input
      name={name}
      type={type}
      onChange={handleChange}
      value={value}
      className={classes.inputTextField}
      placeholder={placeholder}
      style={style}
    />
  )
}

export default CustomInput
