import React from 'react'
import Checkboxes from '../../../../../components/checkbox'
import CustomizedTables from '../../../../../components/table'
import TableTop from '../../../../configuration/common/tableTop'
import ReturnInputs from '../utils/returnInputs'

type Props = {
  orderNumber: string
  rows: []
}
const headers = []

function RequestReturn({ orderNumber, rows }: Props) {
  console.log("rows**  ---> ", rows)
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const ro = rows.map((r: any) => {
    return {
      catalog: r.catalog,
      product: r.name,
      actualPrice: r.price,
      discount: r.discountPrice,
      discountAmount: r.price - r.proposedPrice,
      qty: r.quantity,
      price: r.proposedPrice,
      qtyTimesProduct: r.proposedPrice * r.quantity,
      checkbox: <Checkboxes checked={checked} handleChange={handleChange} />
    }
  })
  return (
    <div>
      <div>
        <div style={{ margin: 10 }}>
          <CustomizedTables
            headers={["Catalog No.", 'Product', 'Actual Price', "Discount %", "Discount Amount", "Qty", "Price", "Qty * Price", "Request Return"]}
            rows={ro}
            isFooter={false}
          />
        </div>
      </div>
      {
        checked ? <ReturnInputs serialNumber='320931' quantity='12' /> : ''
      }
    </div>
  )
}

export default RequestReturn