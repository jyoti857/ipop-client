import ReturnInputs from './returnInputs'
export type C = "SO" | "SU" | "CO" | "RI" | "RW" | "SC" | "SJ" | "SX"
export type ChildOrderType<O extends string> = {
  [K in O]: {
    code: string;
    desc: string;
    qtyPlaceholder: string;
    reasonPlaceholder: string;
    rebillFinalAmountPlaceholder?: string;
  }
}

export const childOrders: ChildOrderType<C> =
{
  SO: {
    code: 'OTSO',
    desc: 'Standard Sales Order',
    qtyPlaceholder: '',
    reasonPlaceholder: ''
  },
  SU: {
    code: 'OTSU',
    desc: 'Augmentation Sales Order',
    qtyPlaceholder: '',
    reasonPlaceholder: ''
  },
  CO: {
    code: 'OTCO',
    desc: 'Consignment Order',
    qtyPlaceholder: '',
    reasonPlaceholder: ''
  },
  RI: {
    code: 'OTRI',
    desc: 'Return - Inventory',
    qtyPlaceholder: 'Return Quantity',
    reasonPlaceholder: 'Return Reason'
  },
  RW: {
    code: 'OTRW',
    desc: 'Replacement for Returns, Within Policy',
    qtyPlaceholder: 'Replacement Quantity',
    reasonPlaceholder: 'Replacement Reason'
  },
  SC: {
    code: 'OTSC',
    desc: 'Special Credit - A/R Only',
    qtyPlaceholder: 'Credit Difference Amount',
    reasonPlaceholder: 'Credit Return Reason'
  },
  SJ: {
    code: 'OTSJ',
    desc: 'Invoice Only - No Inventory',
    qtyPlaceholder: '',
    rebillFinalAmountPlaceholder: "Rebill Final Amount",
    reasonPlaceholder: 'Rebill Reason'
  },
  SX: {
    code: 'OTSX',
    desc: '$0 Loaner Purchased',
    qtyPlaceholder: '',
    reasonPlaceholder: ''
  },
}

//childOrderType: ChildOrderType<C>,
const switchChildOrder = (orderType: ChildOrderType<C>[C], Qu: string, Se: string) => {
  switch (orderType.code) {
    case orderType.code: {
      return <ReturnInputs
        quantity={Qu}
        serialNumber={Se}
        quantityPlaceholder={orderType.qtyPlaceholder}
        reasonPlaceholder={orderType.reasonPlaceholder}
      />
    }
    default: return <div>No order type found</div>
  }
}


type Props = {
  orderType: ChildOrderType<C>[C];
  quantity: string;
  serialNumber: string;
}

function ChildOrders({ orderType, quantity, serialNumber }: Props) {
  console.log("order type ** --->", orderType)
  return (
    // switchChildOrder(orderType, quantity, serialNumber)
    <ReturnInputs
      quantity={quantity}
      serialNumber={serialNumber}
      quantityPlaceholder={orderType.qtyPlaceholder}
      reasonPlaceholder={orderType.reasonPlaceholder}
    />
  )
}

export default ChildOrders