import React, { ReactElement } from 'react'
import DiscountGroupTable from './discount-group-table'

interface Props {

}

function DiscountGroups({ }: Props): ReactElement {
  return (
    <div>
      <DiscountGroupTable />
    </div>
  )
}

export default DiscountGroups
