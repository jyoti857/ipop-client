import { Button, Paper } from '@mui/material';
import React, { ReactElement, useState } from 'react'
import { FaFileInvoice } from 'react-icons/fa';
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
import CustomInput from '../../../../components/input/CustomInput';
import CustomModal from '../../../../components/modal';
import { createQuote } from '../../../../utils/baseUrl';
import { AccountPriceHook } from '../accountPrice/accountPriceHook';
import AccountPriceTable from '../accountPrice/accountPriceTable';
import CustomAccountPriceQuoteFormik from '../accountPriceQuoteFormik';
import QuotesTable from './quotesTable';
import { useStyles } from './styles'
import useQuotesHook from './useQuotesHook';

interface Props {

}
export type AccountPriceType = {
  catalog: string;
  discountPrice: number;
  name: string;
  price: number;
  proposedPrice: number;
  status: string;
  updatedAt: string;
  createdAt: string;
  productWithPrice: any;
  _id: string;

}
function Quotes({ }: Props): ReactElement {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [title, setTitle] = useState('')

  const classes = useStyles();
  const { accountId } = useParams<{ accountId: string }>()
  const { isError, isLoading, accountPriceData, productWithPrice } = useQuotesHook()
  const ds = useMutation(createQuote)

  const [qtySet, setQtySet] = useState<any>(productWithPrice?.map((a: any) => a.qty) || [])

  const quoteDetails = {
    accountId,
    title,
    status: 'ACTV',
    quoteType: "ORDER",
    quoteStatus: "USED",
    productQuotes: productWithPrice?.map((a: any, idx: number) => ({
      ...a,
      qunatity: qtySet[idx] || 0,
    }))
  }

  const handleQuoteSubmit = () => {
    console.log(" quote details **** ", quoteDetails)
    ds.mutateAsync({ ...quoteDetails })
    console.log("quote mutate async is called ")
  }

  console.log("qtySet ---> ", qtySet)
  const { handleChange, values: { priceTitle } } = CustomAccountPriceQuoteFormik({ onsubmit: handleQuoteSubmit })
  const handleQuoteQuantity = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const pwp: any = [...qtySet]
    pwp[idx] = +e.target.value
    setQtySet(pwp)
  }

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
          <CustomInput value='search' name='search' type='text' placeholder='search' style={{ width: '20%', position: 'absolute', top: 10, right: 150 }} />
      </div>
      <div>
        <div className={classes.fileIcon}>
          <FaFileInvoice />
        </div>
        <div className={classes.centerLine}>No quotes found for this account!</div>
      </div>
      </Paper>
      <CustomModal onSubmit={handleQuoteSubmit} handleClose={handleClose} open={open} modalName='Quotes' footerButtonName='Submit for approval' styles={{ minWidth: 1000, height: 700 }}>
        <div>
          {/* <div style={{ position: 'absolute', fontWeight: 600, top: 20, left: 20 }}>Quotes</div> */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginLeft: -20, marginBottom: 12, minWidth: 1000 }}>
            <div style={{ width: '50%' }}>
              <CustomInput
                value={title}
                name='title'
                type='text'
                placeholder='Quote Title'
                style={{ marginLeft: 18, width: '100%', }}
                handleChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
              />
            </div>
            <div style={{ width: '20%' }}>
              <CustomInput value={search} name='search' type='text' placeholder='Start Date' style={{ width: '100%' }} />
            </div>
            <div style={{ width: '20%' }}>
              <CustomInput value={search} name='search' type='text' placeholder='End Date' style={{ width: '100%' }} />
            </div>
          </div>
          {
            isLoading ? <>Fetching the Quote details</> :
              <QuotesTable handleChange={handleChange} handleQuoteQuantity={handleQuoteQuantity} qtySet={qtySet} />
          }
        </div>
      </CustomModal>
    </div>
  )
}

export default Quotes
