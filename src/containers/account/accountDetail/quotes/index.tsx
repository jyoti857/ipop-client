import { Button, Paper } from '@mui/material';
import { ReactElement, useState } from 'react'
import { FaFileInvoice } from 'react-icons/fa';
import CustomInput from '../../../../components/input/CustomInput';
import CustomModal from '../../../../components/modal';
import AccountPriceTable from '../accountPrice/accountPriceTable';
import { useStyles } from './styles'

interface Props {

}

function Quotes({ }: Props): ReactElement {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const classes = useStyles();
  return (
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
          <FaFileInvoice />
        </div>
        <div className={classes.centerLine}>No quotes found for this account!</div>
      </div>
      <CustomModal handleClose={handleClose} open={open} modalName='Quotes' footerButtonName='Submit for approval'>
        <div>
          {/* <div style={{ position: 'absolute', fontWeight: 600, top: 20, left: 20 }}>Quotes</div> */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginLeft: -20 }}>
            <div style={{ width: '58%' }}>
              <CustomInput value={search} name='search' type='text' placeholder='Quote Title' style={{ width: '100%', }} />
            </div>
            <div style={{ width: '20%' }}>
              <CustomInput value={search} name='search' type='text' placeholder='Start Date' style={{ width: '100%' }} />
            </div>
            <div style={{ width: '20%' }}>
              <CustomInput value={search} name='search' type='text' placeholder='End Date' style={{ width: '100%' }} />
            </div>
          </div>
          <AccountPriceTable />
        </div>
      </CustomModal>
    </Paper>
  )
}

export default Quotes
