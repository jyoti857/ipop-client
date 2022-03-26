import { Button, Container, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import CustomInput from '../../../../components/input/CustomInput'
import { theme } from '../../../../theme/customTheme'
import { VscInfo } from "react-icons/vsc";
import OrderDetails from './orderDetails';
import { useStyles } from './styles';
import { useOrderHook } from './useOrderHook';
import { orderStatusMap } from './utils/orderStatusMap'
import CustomFullModal from '../../../../components/modal/customFullModal';
import CustomDropdown from '../../../../components/dropdown';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import QuoteOrderTable from './quoteOrderTable'
import { useMutation, useQueryClient } from 'react-query';
import { createOrder } from '../../../../utils/baseUrl';
import { useParams } from 'react-router-dom';
import { FaRegShareSquare } from "react-icons/fa";
import OrderMoreCard from './orderMoreCard';
import { useOutSideModalClick } from './utils/useOutsideModalClick'
import CustomMenu from '../../../../components/menu';

interface Props {

}
export const transportationDropdownData = [
  {
    desc: 'Overnight 08:30PM',
    value: 'OVRNT0830',
    cost: 55, 
  },
  {
    desc: 'Overnight 10:30PM',
    value: 'OVRNT1030',
    cost: 25, 
  },
  {
    desc: 'Free delivery',
    value: 'FREEDEL0000',
    cost: 0, 
  }
]
function Orders({ }: Props): ReactElement {
  const [isOrderDisplayed, setIsOrderDisplayed] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState("")
  const { accountId } = useParams<{ accountId: string }>()
  const [open, setOpen] = useState(false)
  const [deli_cost, setDeli_cost] = useState<number>(0)
  const [mot, setMot] = useState<string>('')
  const [isMore, setIsMore] = useState(false)
  const [search, setSearch] = useState('')
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    queryClient.invalidateQueries('orders')
    setOpen(false)
  }
  const handleMore = (id: string) => {
    setIsMore(!isMore)
    setSelectedOrderId(id)
  }
  const ref = useRef<any>();
  useOutSideModalClick(ref, () => setIsMore(false))


  const navigateOrderDetailPage = (order_id: string) => {
    setIsOrderDisplayed(true)
    setSelectedOrderId(order_id)
  }
  const classes = useStyles()
  const { data, quotes } = useOrderHook()
  const activeQuotes = quotes?.filter((quote: any) => quote.status === 'ACTV').map(({ title, productQuotes, id }: any) => ({ title, productQuotes, id }))
  const quoteDropdownData = activeQuotes?.map((aq: any) => ({ desc: aq.title, value: aq.id }))

  const ds = data?.find((d: any) => d.id === selectedOrderId)
  const selectedOrderDetail = ds && {
    ...ds,
    currentOrderStatus: orderStatusMap[ds!.currentOrderStatus][0],
    statusColor: orderStatusMap[ds!.currentOrderStatus][2],
    color: orderStatusMap[ds!.currentOrderStatus][1]
  }
  console.log("order data** ---> ", data)
  const orderExtracted = data?.map((a: any) => ({
    id: a.id,
    orderNumber: a.orderNumber,
    createdAt: new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0],
    placedBy: a?.createdBy,
    status: orderStatusMap[a.currentOrderStatus][0],
    color: orderStatusMap[a.currentOrderStatus][1],     
    statusColor: orderStatusMap[a.currentOrderStatus][2],
  }))
  const [ponumber, setPonumber] = useState<string>('')
  const [attentionTo, setAttentionTo] = useState()
  const [dropdown, setDropdown] = useState({ quote: '', transportation: '' })
  const handleDropdown = (e: SelectChangeEvent) => {
    setDropdown(
      {
        ...dropdown,
        [e.target.name]: e.target.value
      }
    )
    const ifDropdowndata = transportationDropdownData.find(f => f.value === e.target.value);
    if (ifDropdowndata) {
      console.log("e.target.value ----", e.target.value, ifDropdowndata)
      setDeli_cost(ifDropdowndata.cost)
      setMot(ifDropdowndata.desc)
    }
  }
  const selectedQuote = activeQuotes?.find((aq: any) => aq.id === dropdown.quote)
  console.log("select quote *** ", selectedQuote)
  const mutation = useMutation(createOrder)
  const queryClient = useQueryClient()
  const handleCreateOrder = async () => {
    await mutation.mutateAsync({
      accountId,
      quoteId: selectedQuote?.id,
      poNumber: ponumber,
      attentionTo,
      deliveryCost: deli_cost,//'55',
      mot, //"OVRNT0830",
      status: "ACTV",
      createdFrom3pl: false,
      orderType: "SO",
      orderFormType: "ORDFREE",
      // updatedBy: "3860BBBF-77FE-EB11-B562-C896653B4413",
      deletedBy: null,
      orderStatus: "10",
      totalAmount: 2929 // just for sake, actual amount is calculated based on the quote selected
    })
    handleClose()
    queryClient.invalidateQueries("orders")
  }
  return (
    <div className={classes.root}>
      <Paper style={{ margin: theme.size?.margin.secondary, padding: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', margin: 12, gap: 12 }}>
          <CustomInput name='search' placeholder='Search order' type='text' value='Search' />
          <Button
            // disabled
            variant='contained'
            onClick={handleOpen}
          >Place an Order</Button>
          <Button
            variant='outlined'
            color='secondary'
          >Sync</Button>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Order Number</TableCell>
                <TableCell align="right">Created At</TableCell>
                <TableCell align="right">Updated At</TableCell>
                <TableCell align="center">Placed By</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderExtracted?.map((a: any) => <TableRow>
                <TableCell style={{ width: '14%' }}>{a.orderNumber}</TableCell>
                  <TableCell align="right">{a.createdAt}</TableCell>
                  <TableCell align="right">{a.updatedAt}</TableCell>
                <TableCell align="center">{a.placedBy}</TableCell>
                <TableCell align="right" style={{ width: '12%', }}>
                  <div style={{ color: a.color, backgroundColor: a.statusColor, padding: 4, borderRadius: 12, display: 'flex', textAlign: 'center', justifyContent: 'center' }}>
                    {a.status}
                  </div>
                </TableCell>
                <TableCell align="center" style={{ width: '14%' }}>
                  <div style={{ justifyContent: 'space-between', display: 'flex', fontSize: 14, position: 'relative' }}>
                    <Button
                      color='primary'
                      variant='outlined'
                    onClick={() => navigateOrderDetailPage(a.id)}
                    >
                      View
                      <VscInfo size={18} style={{ marginLeft: 4 }} />
                    </Button>
                    {/* <Button
                      color='primary'
                      variant='outlined'
                      onClick={() => handleMore(a.id)}
                      disabled={a.status !== 'Order completed'}
                      ref={ref}
                    >
                      More
                      <FaRegShareSquare size={18} style={{ marginLeft: 4 }} />
                    </Button>
                    {
                      isMore && selectedOrderId === a.id ?
                        // <OrderMoreCard orderNumber={a.orderNumber} selectedOrderDetail={selectedOrderDetail} /> :
                        <CustomMenu orderNumber={a.orderNumber} selectedOrderDetail={selectedOrderDetail} /> : ''
                    } */}
                    <CustomMenu
                      menuName='More' orderNumber={a.orderNumber} selectedOrderDetail={selectedOrderDetail}
                      thisOrder={a}
                      setSelectedOrderId={setSelectedOrderId}
                    />
                  </div>
                </TableCell>
              </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {
        isOrderDisplayed ? <OrderDetails selectedOrderDetail={selectedOrderDetail} closeOrderDisplayed={setIsOrderDisplayed} selectedOrderId={selectedOrderId} /> : null
      }
      <div>
        <CustomFullModal disabled={!selectedQuote ? true : false} open={open} footerButtonName='Place Order' onSubmit={handleCreateOrder} handleClose={handleClose} modalName='Create Order'>
          <div>
            <Divider style={{ marginTop: 2, marginBottom: 12 }} />
            <div style={{ margin: '40px 0', borderTopWidth: 3, borderColor: 'red' }} />
            <div className={classes.flex_gen} style={{ width: '34.2%', margin: 10 }}>
              <div className={classes.flex_column}>
                <label>Po Number</label>
                <CustomInput style={{ width: '140%' }} name='po_number' handleChange={(e: any) => setPonumber(e.target.value)} value={ponumber} type='text' placeholder='Enter PO number' />
              </div>
              <div className={classes.flex_column}>
                <label>Attention To</label>
                <CustomInput style={{ width: '140%' }} name='attention_to' handleChange={(e: any) => setAttentionTo(e.target.value)} value={attentionTo} type='text' placeholder='Enter attention ' />
              </div>
            </div>
            <div style={{ margin: '40px 0', borderTopWidth: 3, borderColor: 'red' }} />
            <div style={{ display: 'flex', backgroundColor: 'transparent', justifyContent: 'flex-start' }}>
              <div className={classes.flex_column}>
                <label style={{ margin: '0 10px' }}>Select a Quote</label>
                <CustomDropdown style={{ marginLeft: 1, minWidth: 300 }} name='quote' placeholder='Select a quote' handleChange={handleDropdown} value={dropdown.quote} data={quoteDropdownData} classNames={classes.dropdown} />
              </div>
              <div className={classes.flex_column}>
                <label style={{ margin: '0 10px' }}>Select Mode of transportation</label>
                <CustomDropdown style={{ marginLeft: 1, minWidth: 300 }} name='transportation' handleChange={handleDropdown} placeholder='Select Mode of transportation' value={dropdown.transportation} data={transportationDropdownData} classNames={classes.dropdown} />
              </div>
            </div>
            {selectedQuote && <QuoteOrderTable productWithPrice={selectedQuote?.productQuotes?.filter((pq: any) => pq.quantity > 0)} />}
          </div>
        </CustomFullModal>
      </div>
    </div>
  )
}

export default Orders
