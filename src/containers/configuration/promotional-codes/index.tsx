import React from 'react'
import CustomizedTables from '../../../components/table'
import TableTop from '../common/tableTop'


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
  return (
    <div>
      <TableTop tableName='Promotional Code' />
      <div>
        <CustomizedTables
          headers={["Code", 'Start Date', 'End Date', "Email", "Created By", "Total Products", "Status"]}
          rows={[{ code: 'STRD', startDate: '02-14-2022', endDate: '02-15-2022', email: "devdealdesk@cnxsi.com", createdBy: 'Dev DealDesk', totalProducts: 4, status: "Active" }]} />
      </div>
    </div>
  )
}

export default PromotionalCodes