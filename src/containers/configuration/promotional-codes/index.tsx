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
  //  get the promotional codes
  const { data: promotionalCodesData, isLoading: isPromotionalCodesLoading }: { data: any, isLoading: boolean } = useQuery('getAllPromotionalCodes', getAllPromotionalCodes)
  const [fetchedPromtionalData, setFetchedPromotionalData] = useState<any[]>([])
  useEffect(() => {
    if (promotionalCodesData as any) {
      console.log('pRomi **', promotionalCodesData)
      const { code, startDate, endDate } = promotionalCodesData as unknown as any;
      const s = promotionalCodesData?.map(({ code, createdAt, updatedAt, defaultCode, adminOrderOnly, canEditPrice, isCustom }: any) => ({
        but, code, startDate: createdAt, endDate: updatedAt, email: "devdealdesk@cnxsi.com", createdBy: "Deal Desk",
        defaultCode, adminOrderOnly, canEditPrice, isCustom, totalProducts: 4, status: "active",
      }))
      setFetchedPromotionalData(s);
    }
  }, [promotionalCodesData, isPromotionalCodesLoading])
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
      row={{
        code: 'STRD', startDate: '02-14-2022', endDate: '02-15-2022',
        email: "devdealdesk@cnxsi.com", createdBy: 'Dev DealDesk', totalProducts: 4,
        status: "Active"
      }}
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

  console.log("promi get data --->", promotionalCodesData);

  const but = <Button onClick={() => customClick(details)}>ARROW</Button>
  return (
    <div>
      <TableTop tableName='Promotional Code' onClick={hanldeCreateProductModalOpen} />
      <div>
        {
          fetchedPromtionalData.length > 0 ?
            <CustomizedTables
              headers={[" ", "Code", 'Start Date', 'End Date', "Email", "Created By", "Defult Code", "Admin Order", "Can Edit Price", "Is Custom", "Total Products", "Status"]}
              rows={fetchedPromtionalData}
              // rows={[{ but, code: 'STRD', startDate: '02-14-2022', endDate: '02-15-2022', email: "devdealdesk@cnxsi.com", createdBy: 'Dev DealDesk', totalProducts: 4, status: "Active" }]}
              isFooter={false}
            /> : <Loading />
        }
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
        modalName='Create Promotional Code' footerButtonName='Create' open={createProductModal} handleClose={hanldeCreateProductModalClose}
        onSubmit={onPromotionalCodeSubmit}
      >
        <AddPromotionalCodeModalDetails triggerOnSubmit={isTriggerOnSubmit} products={product} />
      </CustomModal>
    </div>
  )
}

export default PromotionalCodes