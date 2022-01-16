import React, { ReactElement, useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import CustomInput from '../../../components/input/CustomInput'
import CustomModal from '../../../components/modal'
import { createDiscountPrice } from '../../../utils/baseUrl'
import { AccountPriceHook } from '../../account/accountDetail/accountPrice/accountPriceHook'
import AccountPriceTable from '../../account/accountDetail/accountPrice/accountPriceTable'
import DiscountGroupTable from './discount-group-table'
import CustomDiscountPriceFormik from './discount-price-formik'

interface Props {

}

function DiscountGroups({ }: Props): ReactElement {

  const { data, proposedPrice: pp, proposedPriceFromData: ppfd } = AccountPriceHook()
  const [proposedPrice, setProposedPrice] = useState(pp ? pp : [])
  const [discountPrice, setDiscountPrice] = useState([])
  const [discountPriceUpdateFlag, setDiscountPriceUpdateFlag] = useState(false)
  const [proposedPriceFromData, setProposedPriceFromData] = useState<any[]>(ppfd)

  // set the detail per discount table row 
  const [isDetailEnabled, setIsDetailEnabled] = useState(false)
  const handleDeatailEnabled = () => {
    setIsDetailEnabled(!isDetailEnabled)
  }

  useEffect(() => { calculateDiscountPrice() }, [discountPriceUpdateFlag])
  const calculateDiscountPrice = () => {
    const dis = data?.map((d: any, i: number) => (((d.price - proposedPriceFromData[i]) / d.price) * 100).toFixed(2))
    setDiscountPrice(dis)
  }
  const mutation = useMutation(['create-discount=-price'], createDiscountPrice)
  const handleProposedData = (e: any, id: number) => {
    const sd: any[] = [...proposedPriceFromData]
    if (e.target.value > data?.map((d: any) => d.price)[id]) {
      console.log("from data ***", proposedPriceFromData[id])
      setProposedPriceFromData(proposedPriceFromData)
    } else {
      sd[id] = e.target.value;
      setProposedPriceFromData(sd)
    }
    setDiscountPriceUpdateFlag(!discountPriceUpdateFlag)
    console.log("from data ***, proposed", proposedPriceFromData)
    // setDiscountPrice(dis)
  }

  const onCreateDiscountPrice = (e: any) => {
    e.preventDefault();
    mutation.mutateAsync({ name, startDate, endDate, desc })
    setModalOpen(false)
  }
  const { handleChange, values: { name, startDate, desc, endDate } } = CustomDiscountPriceFormik({ onSubmit: onCreateDiscountPrice })
  const [modalOpen, setModalOpen] = useState(false)
  const setHandleModalClose = () => setModalOpen(false)
  const setHandleModalOpen = () => setModalOpen(true)
  return (
    <div>
      {
        modalOpen ? <CustomModal
          open={modalOpen}
          handleClose={setHandleModalClose}
          modalName='New Discount Group'
          footerButtonName='Create'
          styles={{ minWidth: 1000, height: 700 }}
          onSubmit={onCreateDiscountPrice}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ width: '33%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', }}>
                <label>Name</label>
                <CustomInput name='name' placeholder='Name' type='text' value={name} handleChange={handleChange} />
              </div>
              <div style={{ width: '33%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                <label>Start Date</label>
                <CustomInput
                  name='startDate' placeholder='Start Date' type='text' value={startDate}
                  handleChange={handleChange}
                />
              </div>
              <div style={{ width: '33%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                <label>End Date</label>
                <CustomInput
                  name='endDate' placeholder='End Date' type='text' value={endDate || ''}
                  handleChange={handleChange}
                />
              </div>
            </div>
            <div>
              <div style={{ marginTop: 23, marginBottom: 23, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                <label>Descriptions</label>
                <CustomInput name='desc' placeholder='Description' type='textarea' value={desc || ''} handleChange={handleChange} />
              </div>
            </div>
            <AccountPriceTable
              discountPrice={discountPrice} proposedPrice={proposedPrice} proposedPriceFromData={proposedPriceFromData} handleProposedData={handleProposedData} />
          </div>
        </CustomModal> : ''
      }
      <DiscountGroupTable setHandleModalOpen={setHandleModalOpen} />
    </div>
  )
}

export default DiscountGroups
