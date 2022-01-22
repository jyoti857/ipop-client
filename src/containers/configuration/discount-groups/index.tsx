import React, { ReactElement, useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import DGAccordion from '../../../components/accordion/dg_accordion'
import CustomInput from '../../../components/input/CustomInput'
import Loading from '../../../components/loading'
import CustomModal from '../../../components/modal'
import { createDiscountPrice, getAllProducts } from '../../../utils/baseUrl'
import { AccountPriceHook } from '../../account/accountDetail/accountPrice/accountPriceHook'
import AccountPriceTable from '../../account/accountDetail/accountPrice/accountPriceTable'
import DiscountGroupTable from './discount-group-table'
import CustomDiscountPriceFormik from './discount-price-formik'
import EditDiscountGroupPrice from './edit-discountgroups_price'

interface Props {

}

function DiscountGroups({ }: Props): ReactElement {

  const { data, proposedPrice: pp, proposedPriceFromData: ppfd } = AccountPriceHook()
  const { data: productsData, isLoading } = useQuery('getProducts', getAllProducts);
  const [proposedPrice, setProposedPrice] = useState(pp ? pp : [])
  const [discountPrice, setDiscountPrice] = useState([])
  const [editDiscountPriceModal, setEditDiscountPriceModal] = useState(false)
  const [discountPriceUpdateFlag, setDiscountPriceUpdateFlag] = useState(false)
  const [proposedPriceFromData, setProposedPriceFromData] = useState<any[]>(ppfd)

  // set the detail per discount table row 
  const [isDetailEnabled, setIsDetailEnabled] = useState(false)
  const handleDeatailEnabled = () => {
    setIsDetailEnabled(!isDetailEnabled)
  }

  useEffect(() => { calculateDiscountPrice(productsData) }, [discountPriceUpdateFlag])
  const calculateDiscountPrice = (data: any) => {
    console.log("calculated --->", productsData)
    const dis = data?.map((d: any, i: number) => (((d.price - proposedPriceFromData[i]) / d.price) * 100).toFixed(2))
    console.log("calculated price --->", dis)
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
    mutation.mutateAsync({
      name, startDate, endDate, desc,
      discountPriceList: productsData ? productsData.map((pd: any, idx: number) => ({ productId: pd._id, proposedPrice: pd.price, discountPrice: discountPrice[idx] })) : ["dl;sd"]
    })
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
          styles={{ minWidth: 1000, overflow: 'scroll', minHeight: 100, maxHeight: 700, padding: 10 }}
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
      <DiscountGroupTable setHandleModalOpen={setHandleModalOpen} setEditDiscountPriceModal={setEditDiscountPriceModal} />
      <CustomModal styles={{ width: '103%', overFlow: 'hidden' }} modalName='Edit Product Price' footerButtonName='Save' open={editDiscountPriceModal}
        handleClose={() => setEditDiscountPriceModal(false)
        }
      >
        {/* <EditDiscountGroupPrice /> */}
        <AccountPriceTable
          discountPrice={discountPrice} proposedPrice={proposedPrice} proposedPriceFromData={proposedPriceFromData} handleProposedData={handleProposedData} />
      </CustomModal>

    </div>
  )
}

export default DiscountGroups
