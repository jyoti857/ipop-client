import { Button, Paper } from '@mui/material';
import React, { ReactElement, useState } from 'react'
import { FaFileInvoice } from 'react-icons/fa';
import { useMutation, useQueries, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import CustomizedAccordions from '../../../../components/accordion';
import CustomDatePicker from '../../../../components/calendar';
import CustomDropdown from '../../../../components/dropdown';
import CustomInput from '../../../../components/input/CustomInput';
import Loading from '../../../../components/loading';
import CustomModal from '../../../../components/modal';
import CustomFullModal from '../../../../components/modal/customFullModal';
import { createQuote, getQuotes, getQuotesByAccountId } from '../../../../utils/baseUrl';
import { addDays } from '../../../../utils/dateFunctions';
import { AccountPriceHook } from '../accountPrice/accountPriceHook';
import AccountPriceTable from '../accountPrice/accountPriceTable';
import CustomAccountPriceQuoteFormik from '../accountPriceQuoteFormik';
import QuoteAccordion from './QuoteAccordion';
import QuotesTable from './quotesTable';
import { useStyles } from './styles'
import useQuotesHook from './useQuotesHook';
import { QuoteDropdown } from './dropdowns/quoteDropdown'

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
  const currentDate = new Date()
  const [date, setDate] = useState({ startDate: currentDate.toISOString().split('T').toString(), endDate: addDays(currentDate, 60).toISOString().split("T")[0] })
  const classes = useStyles();
  const { accountId } = useParams<{ accountId: string }>()
  const { data } = useQuery(['getQuotesByAccountId', accountId], () => getQuotesByAccountId(accountId))
  const { isError, isLoading, accountPriceData, productWithPrice } = useQuotesHook()
  const mutation = useMutation(createQuote)

  const [qtySet, setQtySet] = useState<any>(productWithPrice?.map((a: any) => a.qty) || [])

  const quoteDetails = {
    accountId,
    title,
    startDate: date.startDate,
    endDate: date.endDate,
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
    mutation.mutateAsync({ ...quoteDetails })
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
  // ----------------------
  const { quoteSubTypeData, quoteTypeData, quoteDropdown, handleQuoteDropdown } = QuoteDropdown();
  const qsdProducts = quoteSubTypeData?.find((qsd: any) => qsd.value === quoteDropdown.quote_sub_type)?.products?.map((p: any) => ({ name: p.name, proposedPrice: p.price, catalog: p.catalog }))
  console.log("e903 -->", qsdProducts, productWithPrice, 'qtyset', qtySet, quoteDropdown)
  return (
    <div>
      <Paper className={classes.root} style={{ position: 'relative', minHeight: 300, display: 'block' }}>
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
          <div style={{ position: 'absolute', top: 10, right: 154 }}>
            <CustomInput value='search' name='search' type='text' placeholder='Search' />
          </div>
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
            <div style={{ marginTop: 60, marginRight: 700, top: 40, paddingBottom: 60 }}>
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
              label='Title'
              placeholder='Quote Title'
              style={{ marginLeft: 18, width: '20%', }}
              handleChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            />
            <div style={{ marginLeft: 18, width: '20%', }}>
              <CustomDropdown data={quoteTypeData} name='quote_type' value={quoteDropdown.quote_type}
                handleChange={handleQuoteDropdown}
                label="Quote Type"
                classNames={classes.dropdown} />
            </div>
            <div style={{ marginLeft: 18, width: '20%', }}>
              <CustomDropdown data={quoteSubTypeData}
                name='quote_sub_type' value={quoteDropdown.quote_sub_type}
                handleChange={handleQuoteDropdown}
                label='Sub Quote Type'
                isDisable={quoteDropdown.quote_type === "std"}
                classNames={classes.dropdown} />
            </div>
            <CustomDatePicker label='Start Date' name='startDate' value={date.startDate}
              handleDateChange={
                (newValue: string) => setDate({
                  ...date,
                  startDate: newValue
                })} />
            <CustomDatePicker label='End Date' name='endDate' value={date.endDate}
              handleDateChange={
                (newValue: string) => setDate({
                  ...date,
                  endDate: newValue
                })}
            />
          </div>
          {
            isLoading ? <Loading /> : quoteDropdown.quote_type === "std"
              ? <QuotesTable editable={true} productWithPrice={productWithPrice} qtySet={qtySet} handleChange={handleChange} handleQuoteQuantity={handleQuoteQuantity} />
              : <QuotesTable editable={true} productWithPrice={qsdProducts} handleChange={handleChange} handleQuoteQuantity={handleQuoteQuantity} qtySet={qtySet} />
          }
          {/* {
            isLoading ? <Loading /> :
              <QuotesTable editable={true} productWithPrice={productWithPrice} qtySet={qtySet} handleChange={handleChange} handleQuoteQuantity={handleQuoteQuantity} />
          } */}
        </div>
      </CustomFullModal>
    </div>
  )
}

export default Quotes
