import { Card, CardActionArea, Divider, Paper } from '@mui/material'
import React, { ReactElement, useState } from 'react'
import { IoArrowUndoOutline } from "react-icons/io5";
import { VscGoToFile } from "react-icons/vsc";
import { HiOutlineCash } from "react-icons/hi";
import { HiOutlineReply } from 'react-icons/hi'
import { useStyles } from './styles';
import RequestReturn from './requestReturn'
import CustomFullModal from '../../../../components/modal/customFullModal';
interface Props {
  orderNumber: string;
  selectedOrderDetail: any
}

function OrderMoreCard({ orderNumber, selectedOrderDetail }: Props): ReactElement {
  const classes = useStyles()
  const [orderCardOpen, setOrderOpen] = useState(false)
  const handleClose = () => setOrderOpen(false)
  const handleOpen = () => setOrderOpen(true)
  return (
    <div>
      <Card sx={{ minWidth: 345, position: 'absolute', top: 40, right: 10, zIndex: 200, boxShadow: '6px 6px 6px #349034' }}>
        <Divider style={{ marginTop: 10, marginBottom: 10 }} />
        <CardActionArea style={{ marginLeft: 12, display: 'flex', justifyContent: 'flex-start' }}>
          <IoArrowUndoOutline size={24} />
          <div
            style={{ padding: 6, fontSize: 14, fontWeight: 400, textAlign: 'left' }}
            onClick={handleOpen}
          >Request Return</div>
        </CardActionArea>
        <Divider style={{ marginTop: 10 }} />
        <CardActionArea style={{ marginLeft: 12, display: 'flex', justifyContent: 'flex-start' }}>
          <VscGoToFile size={24} />
          <div style={{ padding: 6, fontSize: 14, fontWeight: 400, textAlign: 'left' }}>Replace within Warranty Policy</div>
        </CardActionArea>
        <Divider style={{ marginTop: 10 }} />
        <CardActionArea style={{ marginLeft: 12, display: 'flex', justifyContent: 'flex-start' }}>
          <HiOutlineCash size={24} />
          <div
            style={{ padding: 6, fontSize: 14, fontWeight: 400, textAlign: 'left' }}
          >Request Credit</div>
        </CardActionArea>
        <Divider style={{ marginTop: 10 }} />
        <CardActionArea style={{ marginLeft: 12, display: 'flex', justifyContent: 'flex-start' }}>
          <HiOutlineReply size={24} />
          <div
            style={{ padding: 6, fontSize: 14, fontWeight: 400, textAlign: 'left' }}
          >Request Rebill</div>
        </CardActionArea>
        <Divider style={{ marginTop: 10 }} />
      </Card >
      {
        orderCardOpen ?
          <CustomFullModal open={orderCardOpen} handleClose={handleClose} modalName={`Request Return - ${orderNumber}`}>
            {/* <RequestReturn orderNumber={orderNumber} rows={selectedOrderDetail.quote.productQuotes} /> */}
            <div>It was removed and moved to the Menu type component.</div>
          </CustomFullModal>
          : ''
      }
    </div>
  )
}

export default OrderMoreCard
