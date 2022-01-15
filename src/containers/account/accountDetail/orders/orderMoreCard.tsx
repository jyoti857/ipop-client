import { Card, CardActionArea, Divider, Paper } from '@mui/material'
import React, { ReactElement } from 'react'
import { IoArrowUndoOutline } from "react-icons/io5";
import { VscGoToFile } from "react-icons/vsc";
import { HiOutlineCash } from "react-icons/hi";
import { HiOutlineReply } from 'react-icons/hi'
import { useStyles } from './styles';
interface Props {

}

function OrderMoreCard({ }: Props): ReactElement {
  const classes = useStyles()
  return (
    <div>
      <Card sx={{ minWidth: 345, position: 'absolute', top: 40, right: 10, zIndex: 100, boxShadow: '6px 6px 6px #349034' }}>
        <Divider style={{ marginTop: 10, marginBottom: 10 }} />
        <CardActionArea style={{ marginLeft: 12, display: 'flex', justifyContent: 'flex-start' }}>
          <IoArrowUndoOutline size={24} />
          <div
            style={{ padding: 6, fontSize: 14, fontWeight: 400, textAlign: 'left' }}
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
    </div>
  )
}

export default OrderMoreCard
