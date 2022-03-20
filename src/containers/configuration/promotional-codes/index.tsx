import { Button } from '@mui/material';
import React, { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query';
import CustomAccordion from '../../../components/accordion/customAccordion';
import DGAccordion from '../../../components/accordion/dg_accordion';
import CustomInput from '../../../components/input/CustomInput';
import CustomModal from '../../../components/modal';
import CustomizedTables from '../../../components/table'
import { createPromotionalCode, getAllProducts } from '../../../utils/baseUrl';
import TableTop from '../common/tableTop'
import { AccordCard } from './accordCard';
import AddPromotionalCodeModalDetails from './addPromotionalCodeModalDetails';


function createData(
  code: string,
  startDate: string,
  endDate: string,
  email: string,  
  createdBy: number,
  totalProducts: any,
  status: any
) {
  return { code, startDate, endDate, email, createdBy, totalProducts, status };
}
type Props = {}
function PromotionalCodes({ }: Props) {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery('getProducts', getAllProducts);
  const { mutateAsync } = useMutation(createPromotionalCode)

  const extractedProductData = data?.map(({ name, catalog, price }: any) => ({ name, catalog, price }))
  console.log('promotional product data ** ---> ext', extractedProductData)
  const [product, setProductData] = useState<{ name: string, catalog: string, price: number }[]>(extractedProductData);
  const handleProductPriceEdit = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    queryClient.invalidateQueries('getProducts');
    console.log("product(**) ", product, e.target, idx)
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
  // create promotionalcode onSubmit
  const [isTriggerOnSubmit, setIsTriggerOnSubmit] = useState(false)
  const onPromotionalCodeSubmit = async () => {
    setIsTriggerOnSubmit(true)
    // hanldeCreateProductModalClose()
  }
  const productPriceEditInput = (index: number) =>
    <CustomInput value={product ? product[index]?.price : ''} handleChange={(e: any) => handleProductPriceEdit(e, index)} name='price' placeholder={''} type='number' />

  const editProductForPromotionalCodes = extractedProductData?.map(({ name, catalog }: any, index: number) => ({ name, catalog, price: productPriceEditInput(index) }))
  const [arrowClick, setArrowClick] = useState(false)
  const [panel, setPanel] = useState<string | false>(false)
  // edit modal handle close 
  const [editProductModal, setEditProductModal] = useState(false)
  const hanldeEditProductModalOpen = () => setEditProductModal(true)
  const hanldeEditProductModalClose = () => setEditProductModal(false)
  // create modal handle close 
  const [createProductModal, setCreateProductModal] = useState(false)
  const hanldeCreateProductModalOpen = () => setCreateProductModal(true)
  const hanldeCreateProductModalClose = () => setCreateProductModal(false)
  const details = (panel: string) => <div>
    <AccordCard handleModalOpen={hanldeEditProductModalOpen} />
    <CustomAccordion
      isTableRowDisplayed={false}
      panel={panel}
      row={{ code: 'STRD', startDate: '02-14-2022', endDate: '02-15-2022', email: "devdealdesk@cnxsi.com", createdBy: 'Dev DealDesk', totalProducts: 4, status: "Active" }}
      children={<CustomizedTables
        headers={["Name", "Catalog", "Price"]}
        rows={extractedProductData}
      />}
    />
  </div>

  const customClick = (c: any) => {
    setArrowClick(!arrowClick)
    setPanel(panel ? false : panel)
    // c();
  }
  const but = <Button onClick={() => customClick(details)}>ARROW</Button>
  return (
    <div>
      <TableTop tableName='Promotional Code' onClick={hanldeCreateProductModalOpen} />
      <div>
        <CustomizedTables
          headers={[" ", "Code", 'Start Date', 'End Date', "Email", "Created By", "Total Products", "Status"]}
          rows={[{ but, code: 'STRD', startDate: '02-14-2022', endDate: '02-15-2022', email: "devdealdesk@cnxsi.com", createdBy: 'Dev DealDesk', totalProducts: 4, status: "Active" }]}
          isFooter={false}
        />
        {
          arrowClick ? details("043") : ''
        }
      </div>
      <CustomModal
        styles={{ width: 800, overFlow: 'hidden' }}
        modalName='Edit Products' footerButtonName='Save' open={editProductModal} handleClose={hanldeEditProductModalClose}>
        <CustomizedTables
          headers={["Name", "Catalog", "Price"]}
          rows={editProductForPromotionalCodes}
          isFooter={false}
          isCustomInput={true}
        />
      </CustomModal>
      <CustomModal
        styles={{ width: 800, overFlow: 'hidden' }}
        modalName='Create Promotional Code' footerButtonName='Create1' open={createProductModal} handleClose={hanldeCreateProductModalClose}
        onSubmit={onPromotionalCodeSubmit}
      >
        <AddPromotionalCodeModalDetails triggerOnSubmit={isTriggerOnSubmit} products={product} />
      </CustomModal>
    </div>
  )
}

export default PromotionalCodes