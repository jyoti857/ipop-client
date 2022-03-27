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
  label?: string;
  isDisable?: boolean;
}

function CustomDropdown({ isDisable, data, value, handleChange, name, label, classNames, placeholder, style }: Props): ReactElement {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <label style={{ fontFamily: 'sans-serif', fontSize: 20 }}>{label}</label>
      <FormControl sx={{ ...style, top: 4, minWidth: 200, maxWidth: 372 }} size='small' className={clsx(classes.formControl, classNames)}>
          <Select
            value={value}
            onChange={handleChange}
            name={name}
          disabled={isDisable}
          placeholder={placeholder}
          inputProps={{ 'aria-label': 'Without label' }}
            fullWidth
          >
          <MenuItem disabled value="">
            <em>{placeholder}</em>
          </MenuItem>
            {
            data?.map((item: DropdownType, idx: number) => {
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
