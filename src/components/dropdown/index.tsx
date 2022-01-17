import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { Box } from '@mui/system';
import clsx from 'clsx';
import React, { ReactElement, useState } from 'react'
import { useStyles } from './styles';

type DropdownType = {
  value: string;
  desc: string;
}
interface Props {
  data: DropdownType[];
  value: string;
  handleChange?: any;
  name: string;
  classNames?: any;
  placeholder?: string;
  style?: any;
}

function CustomDropdown({ data, value, handleChange, name, classNames, placeholder, style }: Props): ReactElement {
  const classes = useStyles();
  const handleDropdownChange = () => {

  }
  return (
    <div className={classes.root}>
      <FormControl sx={{ ...style, top: 4, maxWidth: 372 }} size='small' className={clsx(classes.formControl, classNames)}>
          <Select
            value={value}
            onChange={handleChange}
            name={name}
          placeholder={placeholder}
          inputProps={{ 'aria-label': 'Without label' }}
            fullWidth
          >
          <MenuItem disabled value="">
            <em>{placeholder}</em>
          </MenuItem>
            {
              data.map((item: DropdownType, idx: number) => {
                return (
                  <MenuItem key={idx} value={item.value}>{item.desc}</MenuItem>
                )
              })
            }
          </Select>
      </FormControl>
    </div >
  )
}

export default CustomDropdown
