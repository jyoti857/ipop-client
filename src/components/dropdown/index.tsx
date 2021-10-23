import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { Box } from '@mui/system';
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
}

function CustomDropdown({ data, value, handleChange }: Props): ReactElement {
  const classes = useStyles();
  const [age, setAge] = useState(value);
  // console.log("age ---> ", age)
  const handleChange_ = (event: any) => {
    setAge(event.target.value);
  };
  // console.log("values subtype *** ", value)
  return (
    <div className={classes.root}>

      {/* <select
            name='subtype'
            value={value}
            onChange={handleChange}
          // style={{ display: 'block' }}
          >{
              data.map((item: DropdownType, idx: number) => {
                console.log("values subtype *** ", item.value, item.desc)
                return (
                  <option key={idx} value={item.value} label={item.desc} />//>{item.desc}</option>
                )
              })
            }
          </select> */}
      <Box>
        <FormControl size='small' className={classes.formControl} >
          {/* <InputLabel id="demo-simple-select-label" /> */}
          {/* <label>Subtype</label> */}
          <Select
            value={value}
            onChange={handleChange}
            name='subtype'
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
