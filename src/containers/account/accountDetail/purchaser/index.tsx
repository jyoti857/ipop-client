import { Paper, TextField, Button, Divider, Checkbox, FormControl, FormLabel, FormGroup, FormControlLabel } from '@mui/material'
import React, { ReactElement, useState } from 'react'
import { FaAccessibleIcon } from 'react-icons/fa';
import CustomAvatar, { CustomAvatarType } from '../../../../components/avatar';
import CustomInput from '../../../../components/input/CustomInput';
import CustomModal from '../../../../components/modal';
import { useStyles } from './styles';
import { BiSearch } from "react-icons/bi";

interface Props {

}
const purchaserData: CustomAvatarType[] = [
  { alt: 'Remy Sharp', src: 'https://reqres.in/img/faces/5-image.jpg', checkStatus: { email: 'a@1.com', status: true } },
  { alt: 'Remy Sharp', src: 'https://reqres.in/img/faces/5-image.jpg', checkStatus: { email: 'a@2.com', status: false } },
  { alt: 'Remy Sharp', src: 'https://reqres.in/img/faces/5-image.jpg', checkStatus: { email: 'a@3.com', status: true } },
  { alt: 'Remy Sharp', src: 'https://reqres.in/img/faces/5-image.jpg', checkStatus: { email: 'a@4.com', status: true } },
]
const emailCheckData = {
  gilad: true,
  jason: false,
  antoine: false,
}
const label = { inputProps: { 'aria-label': 'controlled' } }
function Purchaser({ }: Props): ReactElement {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false)
  const [search, setSearch] = useState('')
  const [checked, setChecked] = useState(purchaserData)//.map(a => a.checkStatus))
  console.log("just checked ---> ", checked)
  const handleClose = () => {
    setOpen(false)
  }
  const handleOpen = () => setOpen(true)
  const handleChange = (event: any) => {
    setSearch(event.target.value)
  }
  const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("event target ---> ", event.target.name, event.target.checked, event.target)
    // setChecked(event.target.checked);
    const checked_ = [...checked];
    const objectIndex = checked.findIndex(c => c.checkStatus?.email === event.target.name);
    checked_[objectIndex] = { ...checked_[objectIndex], checkStatus: { email: event.target.name, status: event.target.checked } }
    // setChecked([
    //   ...checked,
    //   { checkStatus: { email: event.target.name, status: event.target.checked }, alt: '', src: '' }
    //   // { checkStatus: { ...checkedStatus, email: event.target.name, status: event.target.checked } }
    //   // { email: event.target.name, status: event.target.checked }
    //   // { [event.target.name]: event.target.checked },
    // ]);
    setChecked(checked_)
  };
  return (
    <div>
      <Paper className={classes.root}>
        <Button
          color='primary'
          variant='contained'
          style={{ position: 'absolute', top: 10, right: 10 }}
          onClick={handleOpen}
        >
          Add
        </Button>
        <div>
          <div className={classes.fileIcon}>
            <FaAccessibleIcon />
          </div>
          <div className={classes.centerLine}>No purchasers found for this account!</div>
        </div>
        <CustomModal handleClose={handleClose} open={open} >
          <div>
            <div style={{ position: 'absolute', fontWeight: 600, top: 20, left: 20 }}>Add Purchaser</div>
            <div style={{ position: 'relative' }}>
              <CustomInput value={search} name='search' type='text' placeholder='Search' style={{ width: '100%', position: 'relative' }} />
              <BiSearch style={{ position: 'absolute', top: 19, right: 10, fontSize: 25 }} />
            </div>
            {
              checked.map(purchaser => {
                return (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', margin: 10 }}>
                        <CustomAvatar alt={purchaser.alt} src={purchaser.src} />
                        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 10 }}>
                          <span>David Andersen</span>
                          <span>{purchaser.checkStatus!.email}</span>
                        </div>
                      </div>
                      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                        {/* <FormLabel component="legend">Assign responsibility</FormLabel> */}
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Checkbox checked={purchaser.checkStatus?.status} onChange={handleCheckChange} name={purchaser.checkStatus!.email} />
                            }
                            label=''
                          />
                        </FormGroup>
                      </FormControl>
                    </div>
                    <Divider />
                  </div>
                )
              })
            }
          </div>
        </CustomModal>
      </Paper>
    </div>
  )
}

export default Purchaser
