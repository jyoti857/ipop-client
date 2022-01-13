import { Button, Paper } from '@mui/material';
import React, { ReactElement, useState } from 'react'
import { FaFileInvoice } from 'react-icons/fa';
import { useMutation, useQueries, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import CustomizedAccordions from '../../../../components/accordion';
import CustomDropdown from '../../../../components/dropdown';
import CustomInput from '../../../../components/input/CustomInput';
import Loading from '../../../../components/loading';
import CustomModal from '../../../../components/modal';
import CustomFullModal from '../../../../components/modal/customFullModal';
import { createQuote, getQuotes, getQuotesByAccountId } from '../../../../utils/baseUrl';
import { AccountPriceHook } from '../accountPrice/accountPriceHook';
import AccountPriceTable from '../accountPrice/accountPriceTable';
import CustomAccountPriceQuoteFormik from '../accountPriceQuoteFormik';
import QuoteAccordion from './QuoteAccordion';
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
  const { data } = useQuery(['getQuotesByAccountId', accountId], () => getQuotesByAccountId(accountId))
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
      quantity: qtySet[idx] || 0,
    }))
  }

  const quoteList = {
    title,
    status: "Active",
    quoteStatus: "USED",
    productQuotes: productWithPrice?.map((a: any, idx: number) => ({
      productName: a.name,
      quantity: qtySet[idx] || 0,
      price: a.proposedPrice * (qtySet[idx] || 0)
    }))
  }
  console.log("quoteList ---> quoteList ", quoteList, data)

  const handleQuoteSubmit = () => {
    console.log(" quote details **** ", quoteDetails)
    ds.mutateAsync({ ...quoteDetails })
    console.log("quote mutate async is called ")
    setOpen(false)
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
      <Paper className={classes.root} style={{ position: 'relative', minHeight: 300 }}>
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
        {
          !data ? 
            <div>
        <div className={classes.fileIcon}>
          <FaFileInvoice />
        </div>
        <div className={classes.centerLine}>No quotes found for this account!</div>
      </div>
            :
            <div style={{ marginTop: 12, left: 60, top: 40, position: 'absolute', paddingBottom: 60 }}>
          <QuoteAccordion quoteList={data} footerButton={false} />
        </div>
        }
      </Paper>
      {/* CustomModal is cut from here, will be put after sometime   */}
      <CustomFullModal onSubmit={handleQuoteSubmit} open={open} handleClose={handleClose} modalName='Quotes' footerButtonName='Submit for approval'>
        <div>
          <div className={classes.flex_gen}>
            <CustomInput
              value={title}
              name='title'
              type='text'
              placeholder='Quote Title'
              style={{ marginLeft: 18, width: '20%', }}
              handleChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            />
            <div style={{ marginLeft: 18, width: '20%', }}>
              <CustomDropdown data={[{ desc: "dasd", value: "23" }]} name='quote-type' value='23' classNames={classes.dropdown} />
            </div>
            <div style={{ marginLeft: 18, width: '20%', }}>
              <CustomDropdown data={[{ desc: "dasd", value: "23" }]} name='quote-sub-type' value='23' classNames={classes.dropdown} />
            </div>
            <CustomInput
              value={new Date().toISOString().split('T')[0]}
              name='startDate'
              type='text'
              placeholder='Start Date'
              style={{ marginLeft: 18, width: '20%', }}
              handleChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            />
            <CustomInput
              value={new Date().toISOString().split('T')[0]}
              name='endDate'
              type='text'
              placeholder='End Date'
              style={{ marginLeft: 18, width: '20%', }}
              handleChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            />
          </div>
          {
            isLoading ? <Loading /> :
              <QuotesTable editable={true} productWithPrice={productWithPrice} handleChange={handleChange} handleQuoteQuantity={handleQuoteQuantity} qtySet={qtySet} />
          }
        </div>
      </CustomFullModal>
    </div>
  )
}

export default Quotes
