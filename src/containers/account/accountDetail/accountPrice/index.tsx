import { Button, Paper } from '@mui/material';
import React, { ReactElement, useState } from 'react'
import { BiSearch } from 'react-icons/bi';
import { FaFileInvoiceDollar } from 'react-icons/fa';
import CustomInput from '../../../../components/input/CustomInput';
import CustomModal from '../../../../components/modal';
import { useStyles } from './styles';

interface Props {

}

function AccountPrice({ }: Props): ReactElement {
  const classes = useStyles();
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <div>
      <Paper className={classes.root}>
        <div style={{ display: 'flex' }}>
          <Button
            color='primary'
            variant='contained'
            style={{ position: 'absolute', top: 10, right: 80 }}
            onClick={handleOpen}
          >
            Add
          </Button>
          <Button
            style={{ position: 'absolute', top: 10, right: 10 }}
            color='secondary'
            variant='outlined'
          >Sync</Button>
          <CustomInput value='search' name='search' type='text' placeholder='search' style={{ width: '20%', position: 'absolute', top: 0, right: 140 }} />
        </div>
        <div>
          <div className={classes.fileIcon}>
            <FaFileInvoiceDollar />
          </div>
          <div className={classes.centerLine}>No price list found for this account!</div>
        </div>
        <CustomModal handleClose={handleClose} open={open} >
          <div>
            <div style={{ position: 'absolute', fontWeight: 600, top: 20, left: 20 }}>Add Purchaser</div>
            <div style={{ position: 'relative' }}>
              <CustomInput value={search} name='search' type='text' placeholder='Search' style={{ width: '100%', position: 'relative' }} />
              <BiSearch style={{ position: 'absolute', top: 19, right: 10, fontSize: 25 }} />
            </div>
          </div>
        </CustomModal>
      </Paper>
    </div>
  )
}

export default AccountPrice
