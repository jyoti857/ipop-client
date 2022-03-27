import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query';
import CustomAccordion from '../../../components/accordion/customAccordion';
import DGAccordion from '../../../components/accordion/dg_accordion';
import CustomInput from '../../../components/input/CustomInput';
import Loading from '../../../components/loading';
import CustomModal from '../../../components/modal';
import CustomizedTables from '../../../components/table'
import { createPromotionalCode, getAllProducts, getAllPromotionalCodes } from '../../../utils/baseUrl';
import TableTop from '../common/tableTop'
import { AccordCard } from './accordCard';
import AddPromotionalCodeModalDetails from './addPromotionalCodeModalDetails';


function createData(
  code: string,
  startDate: string,
  endDate: string,
  email: string,  
  createdBy: number,
  defaultCode: boolean,
  adminOrderOnly: boolean,
  canEditPrice: boolean,
  isCustom: boolean,
  totalProducts: any,
  status: any,
) {
  return { code, startDate, endDate, email, createdBy, defaultCode, adminOrderOnly, canEditPrice, isCustom, totalProducts, status };
}
type Props = {}
function PromotionalCodes({ }: Props) {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery('getProducts', getAllProducts);
  const { mutateAsync } = useMutation(createPromotionalCode)

  const extractedProductData = data?.map(({ name, catalog, price }: any) => ({ name, catalog, price }))
  const [product, setProductData] = useState<{ name: string, catalog: string, price: number }[]>(extractedProductData);
  const handleProductPriceEdit = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    queryClient.invalidateQueries('getProducts');
    if (product && product.length > 0) {
      const selectedProduct = product[idx]
      const up = {
        ...selectedProduct,
        [e.target.name]: +e.target.value
      }
      product.splice(idx, 1, up)
      setProductData(product)
    }
  }
  const [arrowClick, setArrowClick] = useState(false)
  const [arrowClickId, setArrowClickId] = useState("")
  //  get the promotional codes
  const { data: promotionalCodesData, isLoading: isPromotionalCodesLoading }: { data: any, isLoading: boolean } = useQuery('getAllPromotionalCodes', getAllPromotionalCodes)
  const [fetchedPromtionalData, setFetchedPromotionalData] = useState<any[]>([])
  const but_ = (id: any) => <Button onClick={() => setArrowClickId((prevId: any) => prevId != id ? id : "")}>ARROW</Button>
  useEffect(() => {
    if (promotionalCodesData as any) {
      const { code, startDate, endDate } = promotionalCodesData as unknown as any;
      const s = promotionalCodesData?.map(({ _id, code, createdAt, updatedAt, defaultCode, adminOrderOnly, canEditPrice, isCustom }: any) => ({
        but: but_(_id)
        , _id, code, startDate: createdAt, endDate: updatedAt, email: "devdealdesk@cnxsi.com", createdBy: "Deal Desk",
        defaultCode, adminOrderOnly, canEditPrice, isCustom, totalProducts: 4, status: "active" //{ status: "active", _id }
      }))
      setFetchedPromotionalData(s);
    }
  }, [!!promotionalCodesData, isPromotionalCodesLoading])
  // create promotionalcode onSubmit
  const [isTriggerOnSubmit, setIsTriggerOnSubmit] = useState(false)
  const onPromotionalCodeSubmit = async () => {
    setIsTriggerOnSubmit(true)
    // hanldeCreateProductModalClose()
  }
  const productPriceEditInput = (index: number) =>
    <CustomInput value={product ? product[index]?.price : ''} handleChange={(e: any) => handleProductPriceEdit(e, index)} name='price' placeholder={''} type='number' />

  // const editProductForPromotionalCodes = extractedProductData?.map(({ name, catalog }: any, index: number) => ({ name, catalog, price: productPriceEditInput(index) }))
  const editProductForPromotionalCodes = promotionalCodesData?.map(({ products, code, _id }: { products: any, code: string, _id: string }, index: number) => ({ products, _id }))
    ?.map(({ products, _id }: any, index: number) => ({ products, _id }))
  //?.map(({ name, catalog, price }: any, index: number) => ({ name, catalog, price }))
  console.log("0r9 **8  ---> ", editProductForPromotionalCodes, promotionalCodesData)
  const [panel, setPanel] = useState<string | false>(false)
  // edit modal handle close 
  const [editProductModal, setEditProductModal] = useState(false)
  const hanldeEditProductModalOpen = () => setEditProductModal(true)
  const hanldeEditProductModalClose = () => setEditProductModal(false)
  // create modal handle close 
  const [createProductModal, setCreateProductModal] = useState(false)
  const hanldeCreateProductModalOpen = () => setCreateProductModal(true)
  const hanldeCreateProductModalClose = () => setCreateProductModal(false)
  const ser = promotionalCodesData?.find((d: any) => d._id == "623701e0ba368ed0d12aa2d1").products
  const getSelectedPromocodePriceDetails = (promoId: string) => {
    return promotionalCodesData?.find((d: any) => d._id == promoId).products
  }

  // ----------- for promotional product edit
  const [clickedProductToEdit, setClickedProductToEdit] = useState<[{}]>([{}])
  const handleProductPriceEdit_ = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const s = [...clickedProductToEdit]
    const o = s[idx]
    console.log("e 8892348932432 ", e.target, s, o, idx)
    const swe = {
      ...o,
      [e.target.name]: e.target.value
    }
    clickedProductToEdit.splice(idx, 1, swe)

    setClickedProductToEdit(clickedProductToEdit)

  }
  const details = (promoId: string) => {
    setClickedProductToEdit(getSelectedPromocodePriceDetails(promoId))
    // ?.map(({ name, catalog }: any, index: number) => ({ name, catalog, price: productPriceEditInput(index) })))
    return <div style={{ width: 800, }}>
      <AccordCard handleModalOpen={hanldeEditProductModalOpen} buttonName='Edit' />
    <CustomAccordion
      isTableRowDisplayed={false}
      panel={"panel"} // panel is just made like this not this way it should be 
      row={{
        code: 'STRD', startDate: '02-14-2022', endDate: '02-15-2022',
        email: "devdealdesk@cnxsi.com", createdBy: 'Dev DealDesk', totalProducts: 4,
        status: "Active"
      }}
      children={<CustomizedTables
        headers={["Name", "Catalog", "Price"]}
        rows={getSelectedPromocodePriceDetails(promoId)}
      />}
    />
    </div>
  }
  return (
    <div>
      <TableTop tableName='Promotional Code' onClick={hanldeCreateProductModalOpen} />
      <div>
        {
          fetchedPromtionalData.length > 0 ?
            <CustomizedTables
              headers={[" ", "id", "Code", 'Start Date', 'End Date', "Email", "Created By", "Defult Code", "Admin Order", "Can Edit Price", "Is Custom", "Total Products", "Status"]}
              rows={fetchedPromtionalData}
              // rows={[{ but, code: 'STRD', startDate: '02-14-2022', endDate: '02-15-2022', email: "devdealdesk@cnxsi.com", createdBy: 'Dev DealDesk', totalProducts: 4, status: "Active" }]}
              isFooter={false}
              isChildren={true}
              promocodeId={arrowClickId}
              productDetails={details}
            /> : <Loading />
        }
        {/* {
          arrowClick ? details("043") : ''
        } */}
      </div>
      <CustomModal
        styles={{ width: 800, overFlow: 'hidden' }}
        modalName='Edit Products' footerButtonName='Save' open={editProductModal} handleClose={hanldeEditProductModalClose}>
        <CustomizedTables
          headers={["Name", "Catalog", "Price"]}
          // rows={editProductForPromotionalCodes}
          rows={clickedProductToEdit}
          isFooter={false}
          isCustomInput={true}
          handleInputChange={handleProductPriceEdit_}
        />
      </CustomModal>
      <CustomModal
        styles={{ width: 800, overFlow: 'hidden' }}
        modalName='Create Promotional Code' footerButtonName='Create' open={createProductModal} handleClose={hanldeCreateProductModalClose}
        onSubmit={onPromotionalCodeSubmit}
      >
        <AddPromotionalCodeModalDetails triggerOnSubmit={isTriggerOnSubmit} products={product} />
      </CustomModal>
    </div>
  )
}

export default PromotionalCodes