import { Button, Paper } from '@mui/material';
import { ReactElement, useState } from 'react'
import { FaFileInvoiceDollar } from 'react-icons/fa';
import CustomInput from '../../../../components/input/CustomInput';
import CustomModal from '../../../../components/modal';
import { useStyles } from './styles';
import AccountPriceTable from './accountPriceTable'
import CustomAccountPriceQuoteFormik from '../accountPriceQuoteFormik';
import { useMutation, useQuery } from 'react-query'
import { createAccountPrice } from '../../../../utils/baseUrl';
import { useParams } from 'react-router-dom'
interface Props {

}

function AccountPrice({ }: Props): ReactElement {
  const classes = useStyles();
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const { accountId } = useParams<{ accountId: string }>();
  const mutation = useMutation(createAccountPrice)
  const handleAccountPriceSubmit = (event: any) => {
    console.log("account-price-quote ", typeof event, priceTitle, startDate, endDate)
    mutation.mutateAsync({ id: accountId, priceTitle, startDate, endDate })
  }

  const { handleBlur, handleChange, values: { endDate, startDate, priceTitle } } = CustomAccountPriceQuoteFormik({ onsubmit: handleAccountPriceSubmit })
  return (
    <div>
      <Paper className={classes.root}>
        <div style={{ display: 'flex', margin: 10 }}>
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
          <CustomInput value='search' name='search' type='text' placeholder='search' style={{ width: '20%', position: 'absolute', top: 8, right: 150 }} />
        </div>
        <div>
          <div
            className={classes.fileIcon}
          >
            <FaFileInvoiceDollar />
          </div>
          <div className={classes.centerLine}>No price list found for this account!</div>
        </div>
      </Paper>
      <CustomModal handleClose={handleClose} open={open} modalName='Account Price' footerButtonName='Submit for approval' styles={{ minWidth: 1000 }} onSubmit={handleAccountPriceSubmit}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: 12 }}>
            <div style={{ display: 'flex' }}>Price list type</div>
            <div style={{ width: '49%' }}>
              <CustomInput value={priceTitle} handleChange={handleChange} name='priceTitle' type='text' placeholder='Price list title' style={{ width: '100%' }} />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: 12 }}>
            <div style={{ width: '48%' }}>
              <CustomInput value={startDate} handleChange={handleChange} name='startDate' type='text' placeholder='Start Date' style={{ width: '100%' }} />
            </div>
            <div style={{ width: '49%' }}>
              <CustomInput value={endDate} handleChange={handleChange} name='endDate' type='text' placeholder='End Date' style={{ width: '100%' }} />
            </div>
          </div>
          <AccountPriceTable />
        </div>
      </CustomModal>
    </div>
  )
}

export default AccountPrice
