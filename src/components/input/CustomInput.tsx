import React, { ReactElement } from 'react'
import { useStyles } from './styles'

interface Props {
  handleChange: any;
  value: string | number;
  name: string;
  type: string;
  placeholder: string;
}

function CustomInput({ placeholder, name, type, handleChange, value }: Props): ReactElement {
  const classes = useStyles();
  return (
    <input
      name={name}
      type={type}
      onChange={handleChange}
      value={value}
      className={classes.inputTextField}
      placeholder={placeholder}
    />
  )
}

export default CustomInput
