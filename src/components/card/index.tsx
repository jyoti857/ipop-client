import { Card, CardActionArea, Divider } from '@mui/material'
import React, { ReactElement, useEffect, useState } from 'react'
import CustomAvatar from '../avatar'
import CustomInput from '../input/CustomInput';
import CustomModal from '../modal';

interface Props {
  setCardOpen: (a: boolean) => void;
}

function CustomCard({ setCardOpen }: Props): ReactElement {
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState('')
  const handleModalOpen = () => {
    setModalOpen(true);
    // setTimeout(() => setCardOpen(false), 7000);
  }
  useEffect(() => {
    if (!modalOpen) {
      console.log('modal open --->', modalOpen)
      setTimeout(() => setCardOpen(false), 213000);
    }
  }, [modalOpen])
  const handleModalClose = () => setModalOpen(false)
  return (
    <div>
      <Card sx={{ maxWidth: 345, position: 'absolute', top: 60, right: 10, zIndex: 100 }}>
        <div style={{ display: 'flex', justifyContent: 'flex-start', padding: 8 }}>
          <CustomAvatar alt="Remy Sharp" src="https://reqres.in/img/faces/5-image.jpg" />
          <div style={{ marginLeft: 6, textAlign: 'left' }}>
            Dev Dealdesk <br />
            devdealdesk@123.com
          </div>
        </div>
        <Divider style={{ marginTop: 10, marginBottom: 10 }} />
        <CardActionArea>
          <div
            style={{ padding: 6, fontSize: 14, fontWeight: 400, textAlign: 'left' }}
            onClick={handleModalOpen}
          >Generate Registration Link</div>
        </CardActionArea>
        <CardActionArea>
          <div style={{ padding: 6, fontSize: 14, fontWeight: 400, textAlign: 'left' }}>Profile And Account</div>
        </CardActionArea>
        <Divider style={{ marginTop: 10 }} />
        <CardActionArea>
          <div style={{ paddingTop: 6, paddingBottom: 6, fontSize: 18, fontWeight: 'bold' }}>Logout</div>
        </CardActionArea>
      </Card>
      <CustomModal handleClose={handleModalClose} open={modalOpen} modalName='Invite Purchaser' footerButtonName='Send link' styles={{ height: 20 }}>
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'start' }}>
            <div style={{ fontSize: 14, marginBottom: 20 }}>Please enter valid purchaser email address to send the registration link</div>
            <label>Email</label>
          </div>
          <CustomInput
            placeholder=''
            name='email'
            type='text'
            value={email}
            handleChange={(e: React.ChangeEvent<any>) => setEmail(e.target.value)}
            style={{ width: '60%', marginLeft: -3 }}
          />
        </div>
      </CustomModal>
    </div>
  )
}

export default CustomCard
