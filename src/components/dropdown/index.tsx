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
  handleChange: any;
  name: string;
  classNames?: any;
}

function CustomDropdown({ data, value, handleChange, name, classNames }: Props): ReactElement {
  const classes = useStyles();
  const [age, setAge] = useState(value);
  const handleChange_ = (event: any) => {
    setAge(event.target.value);
  };
  return (
    <div className={classes.root}>
      <Box>
        <FormControl size='small' className={clsx(classes.formControl, classNames)} >
          <Select
            value={value}
            onChange={handleChange}
            name={name}
            fullWidth
          >
            {
              data.map((item: DropdownType, idx: number) => {
                return (
                  <MenuItem key={idx} value={item.value}>{item.desc}</MenuItem>
                )
              })
            }
          </Select>
        </FormControl>
      </Box>

    </div >
  )
}

export default CustomDropdown
