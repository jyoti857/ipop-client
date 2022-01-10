import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { ReactElement, useState } from 'react'
import CustomInput from '../../../../components/input/CustomInput'
import { theme } from '../../../../theme/customTheme'
import { VscInfo } from "react-icons/vsc";
import OrderDetails from './orderDetails';
import { useStyles } from './styles';
import { useOrderHook } from './useOrderHook';
import { orderStatusMap } from './utils/orderStatusMap'

interface Props {

}
const s = [{ orderNumber: "320-323123", createdAt: '2021-2-2', updatedAt: "2021-2-3", placedBy: 'John', status: 'Active' }]
function Orders({ }: Props): ReactElement {
  const [isOrderDisplayed, setIsOrderDisplayed] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState("")
  const handleOrderDisplayed = () => setIsOrderDisplayed(true)
  const navigateOrderDetailPage = (order_id: string) => {
    setIsOrderDisplayed(true)
    setSelectedOrderId(order_id)
  }
  const classes = useStyles()
  const { data } = useOrderHook()
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
    statusColor: orderStatusMap[a.currentOrderStatus][2],
    color: orderStatusMap[a.currentOrderStatus][1]
  }))
  console.log("&& from order page order", selectedOrderDetail)
  return (
    <div className={classes.root}>
      {/* <Container> */}
      <Paper style={{ margin: theme.size?.margin.secondary }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', margin: 12, gap: 12 }}>
          <CustomInput name='search' placeholder='Search order' type='text' value='Search' />
          <Button
            variant='contained'
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
      {/* </Container> */}
      {
        isOrderDisplayed ? <OrderDetails selectedOrderDetail={selectedOrderDetail} closeOrderDisplayed={setIsOrderDisplayed} selectedOrderId={selectedOrderId} /> : null
      }
    </div>
  )
}

export default Orders
