import React, { ReactElement } from 'react'
import DiscountGroups from './discount-groups'
import Products from './products'
import PromotionalCodes from './promotional-codes'
import Users from './Users'

interface Props {
  cTabName: string;
  className: any
}

const tabs = (cTabName: string): ReactElement | undefined => {
  switch (cTabName) {
    case "Users": return <Users />
    case "Products": return <Products />
    case "Discount Groups": return <DiscountGroups />
    case "Promotional Codes": return <PromotionalCodes />
    default: <DiscountGroups />
  }
}
function SwitchTabs({ cTabName, className }: Props): ReactElement {
  return (
    <div className={className}>
      {tabs(cTabName)}
    </div>
  )
}

export default SwitchTabs
