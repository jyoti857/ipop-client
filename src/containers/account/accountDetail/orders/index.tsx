import { Button, Container, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { ReactElement, useState } from 'react'
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

interface Props {

}
const s = [{ orderNumber: "320-323123", createdAt: '2021-2-2', updatedAt: "2021-2-3", placedBy: 'John', status: 'Active' }]
function Orders({ }: Props): ReactElement {
  const [isOrderDisplayed, setIsOrderDisplayed] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState("")
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleOrderDisplayed = () => setIsOrderDisplayed(true)
  const navigateOrderDetailPage = (order_id: string) => {
    setIsOrderDisplayed(true)
    setSelectedOrderId(order_id)
  }
  const classes = useStyles()
  const { data, quotes } = useOrderHook()
  const activeQuotes = quotes?.filter((quote: any) => quote.status === 'ACTV').map(({ title, productQuotes, id }: any) => ({ title, productQuotes, id }))
  const quoteDropdownData = activeQuotes?.map((aq: any) => ({ desc: aq.title, value: aq.title }))
  const ds = data?.find((d: any) => d.id === selectedOrderId)
  const selectedOrderDetail = ds && {
    ...ds,
    currentOrderStatus: orderStatusMap[ds!.currentOrderStatus][0],
    statusColor: orderStatusMap[ds!.currentOrderStatus][2],
    color: orderStatusMap[ds!.currentOrderStatus][1]
  }
  const orderExtracted = data?.map((a: any) => ({
    id: a.id,
    orderNumber: a.orderNumber,
    createdAt: '2021-2-2',
    updatedAt: "2021-2-3",
    placedBy: 'John',
    status: orderStatusMap[a.currentOrderStatus][0],
    color: orderStatusMap[a.currentOrderStatus][1],     
    statusColor: orderStatusMap[a.currentOrderStatus][2],
  }))
  console.log("&& from order page order u", quotes)

  const [dropdown, setDropdown] = useState({ quote: '', transportation: '' })
  const handleDropdown = (e: SelectChangeEvent) => {
    setDropdown(
      {
        ...dropdown,
        [e.target.name]: e.target.value
      }
    )
  }
  const selectedQuote = activeQuotes?.find((aq: any) => aq.title === dropdown.quote)
  console.log("selected quote ---** --->", activeQuotes, selectedQuote)
  return (
    <div className={classes.root}>
      <Paper style={{ margin: theme.size?.margin.secondary }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', margin: 12, gap: 12 }}>
          <CustomInput name='search' placeholder='Search order' type='text' value='Search' />
          <Button
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
                  <TableCell>{a.orderNumber}</TableCell>
                  <TableCell align="right">{a.createdAt}</TableCell>
                  <TableCell align="right">{a.updatedAt}</TableCell>
                <TableCell align="center">{a.placedBy}</TableCell>
                <TableCell align="right" style={{ width: '12%', }}>
                  <div style={{ color: a.color, backgroundColor: a.statusColor, padding: 4, borderRadius: 12, display: 'flex', textAlign: 'center', justifyContent: 'center' }}>
                    {a.status}
                  </div>
                </TableCell>
                  <TableCell align="center">
                    <Button
                      color='primary'
                      variant='outlined'
                    onClick={() => navigateOrderDetailPage(a.id)}
                    >
                      <VscInfo size={20} style={{ marginRight: 4 }} />
                      View</Button>
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
        <CustomFullModal open={open} footerButtonName='Place Order' handleClose={handleClose} modalName='Create Order'>
          <div>
            <Divider style={{ marginTop: 2, marginBottom: 12 }} />
            <div className={classes.flex_gen} style={{ width: '50%', margin: 10 }}>
              <div className={classes.flex_column}>
                <label>Po Number</label>
                <CustomInput name='po_number' value={32} type='text' placeholder='Enter po number' />
              </div>
              <div className={classes.flex_column}>
                <label>Attention To</label>
                <CustomInput name='attention_to' value={32} type='text' placeholder='Enter attention ' />
              </div>
            </div>
            <div style={{ display: 'flex', backgroundColor: 'transparent', justifyContent: 'flex-start' }}>
              <div className={classes.flex_column}>
                <label>Select a Quote</label>
                <CustomDropdown name='quote' placeholder='Select a quote' handleChange={handleDropdown} value={dropdown.quote} data={quoteDropdownData} classNames={classes.dropdown} />
              </div>
              <div className={classes.flex_column}>
                <label>Select Mode of transportation</label>
                <CustomDropdown name='transportation' handleChange={handleDropdown} placeholder='Select Mode of transportation' value={dropdown.transportation} data={quoteDropdownData} classNames={classes.dropdown} />
              </div>
            </div>
            <QuoteOrderTable productWithPrice={selectedQuote?.productQuotes?.filter((pq: any) => pq.quantity > 0)} />
          </div>
        </CustomFullModal>
      </div>
    </div>
  )
}

export default Orders
