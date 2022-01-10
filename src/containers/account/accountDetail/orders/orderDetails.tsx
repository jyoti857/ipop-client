import { CloseOutlined } from '@mui/icons-material'
import { Divider, IconButton } from '@mui/material'
import React, { ReactElement } from 'react'
import CustomPartitionTable from '../../../../components/table/customPartitionTable'
import { useStyles } from './styles'
import { useOrderHook } from './useOrderHook'

interface Props {
  closeOrderDisplayed: (a: boolean) => void;
  selectedOrderId: string
}

function OrderDetails({ closeOrderDisplayed, selectedOrderId }: Props): ReactElement {
  const classes = useStyles()
  const { data } = useOrderHook()
  const selectedOrderDetail = data?.find((d: any) => d.id == selectedOrderId)
  console.log("selected order details ***---> ", selectedOrderDetail)
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
      <CustomPartitionTable selectedOrderDetail={selectedOrderDetail} />
    </div >
  )
}

export default OrderDetails
