import { CloseOutlined } from '@mui/icons-material'
import { Divider, IconButton, Paper } from '@mui/material'
import React, { ReactElement } from 'react'
import CustomPartitionTable from '../../../../components/table/customPartitionTable'
import { useStyles } from './styles'
import { useOrderHook } from './useOrderHook'
import QuoteOrderTable from './quoteOrderTable'

interface Props {
  closeOrderDisplayed: (a: boolean) => void;
  selectedOrderId: string;
  selectedOrderDetail: any
}

function OrderDetails({ closeOrderDisplayed, selectedOrderId, selectedOrderDetail }: Props): ReactElement {
  const classes = useStyles()
  console.log("selected order details ***---> ", selectedOrderDetail)
  const { quote: { productQuotes }, ...restSelectedOrderDetail } = selectedOrderDetail
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, backgroundColor: 'white', width: '100%', height: '100%' }}>
      <div style={{ backgroundColor: 'transparent', display: 'flex', justifyContent: 'center' }}>
        <div className={classes.flex_gen}>
          <span style={{ fontWeight: 500, fontSize: 24 }}>Order Details</span>
          <IconButton
            onClick={() => closeOrderDisplayed(false)}
          >
            <CloseOutlined />
          </IconButton>
        </div>
      </div>
      <Divider />
      <div style={{ margin: 12, width: '98%' }}>
        <Paper elevation={3} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <CustomPartitionTable selectedOrderDetail={restSelectedOrderDetail} />
        </Paper>
        <QuoteOrderTable productWithPrice={productQuotes} />
      </div>
    </div >
  )
}

export default OrderDetails
