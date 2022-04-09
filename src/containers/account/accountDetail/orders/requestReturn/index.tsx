import { TableCell, TableHead, TableRow } from '@mui/material'
import React from 'react'
import CustomAccordion from '../../../../../components/accordion/customAccordion'
import Checkboxes from '../../../../../components/checkbox'
import CustomizedTables from '../../../../../components/table'
import TableTop from '../../../../configuration/common/tableTop'
import { StyledTableCell, StyledTableRow } from '../../../../configuration/products'
import ChildOrders, { C, ChildOrderType } from '../utils/childOrderType'
import ReturnInputs from '../utils/returnInputs'

type Props = {
  orderNumber: string
  rows: [];
  orderType: ChildOrderType<C>[C];
}
const headers = []

function RequestReturn({ orderNumber, rows, orderType }: Props) {
  console.log("rows**  ---> ", rows)
  const [checked, setChecked] = React.useState(false);

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setChecked(event.target.checked);
  // };

  const ro = rows?.map((r: any) => {
    return {
      catalog: r.catalog,
      product: r.name,
      actualPrice: r.price,
      discount: r.discountPrice,
      discountAmount: r.price - r.proposedPrice,
      qty: r.quantity,
      price: r.proposedPrice,
      qtyTimesProduct: r.proposedPrice * r.quantity,
      checkbox: <Checkboxes catalog={r.catalog} />
    }
  })

  const headers = ["Catalog No.", 'Product', 'Actual Price', "Discount %", "Discount Amount", "Qty", "Price", "Qty * Price", "Request Return"]
  return (
    <div>
      <div style={{
        display: 'flex', justifyContent: 'space-between', width: '98%', margin: '10px 12px', fontWeight: 'bold',
        backgroundColor: '#942BA8',
      }}>
        {
          headers.map((header, idx) => <div
            style={{
              width: idx == 0 || idx == 1 ? 250 : 150,
              color: 'white'
            }}>
            {header}
          </div>)
        }
      </div>
      {
        ro?.map(r => (
          <CustomAccordion 
            isTableRowDisplayed={true}
            panel={"sd"} // this line is added because of dependancy is required for another module 
            row={r}
            isFooter={false}
          >
            {
              // orderType.split('').splice(-2).join('') as C
              <ChildOrders serialNumber='320931' quantity={r.qty} orderType={orderType} />
            }
          </CustomAccordion>
        ))
      }
    </div>
  )
}

export default RequestReturn