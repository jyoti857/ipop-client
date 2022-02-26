import ReturnInputs from './returnInputs'
export type C = "SO" | "SU" | "CO" | "RI" | "RW" | "SC" | "SJ" | "SX"
export type ChildOrderType<O extends string> = {
  [K in O]: {
    code: string;
    desc: string;
  }
}

export const childOrders: ChildOrderType<C> =
{
  SO: {
    code: 'OTSO',
    desc: 'Standard Sales Order'
  },
  SU: {
    code: 'OTSU',
    desc: 'Augmentation Sales Order'
  },
  CO: {
    code: 'OTCO',
    desc: 'Consignment Order'
  },
  RI: {
    code: 'OTRI',
    desc: 'Return - Inventory'
  },
  RW: {
    code: 'OTRW',
    desc: 'Replacement for Returns, Within Policy'
  },
  SC: {
    code: 'OTSC',
    desc: 'Special Credit - A/R Only'
  },
  SJ: {
    code: 'OTSJ',
    desc: 'Invoice Only - No Inventory'
  },
  SX: {
    code: 'OTSX',
    desc: '$0 Loaner Purchased'
  },
}

//childOrderType: ChildOrderType<C>,
const switchChildOrder = (orderType: C, Qu: string, Se: string) => {
  switch (orderType) {
    case "RI": {
      return <ReturnInputs quantity={Qu} serialNumber={Se} />
    }
    default: return <div>No order type found</div>
  }
}


type Props = {
  orderType: C;
  quantity: string;
  serialNumber: string;
}

function ChildOrders({ orderType, quantity, serialNumber }: Props) {
  console.log("order type ** --->", orderType)
  return (
    switchChildOrder(orderType, quantity, serialNumber)
  )
}

export default ChildOrders