import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { getOrdersByAccountId } from "../../../../utils/baseUrl"


interface OrderDetailsType {
  orderNumber: string;
  currentOrderStatus: string;
  poNumber: string;
  reference: string;
  attentionTo: string;
  mot: string;
  shippingCost: string;
  totalAmount: string;
  specialInstruction?: string;
}

export const useOrderHook = () => {

  const { accountId } = useParams<{ accountId: string }>()
  const { data }: { data: any } = useQuery(['order, `${accountId}`'], () => getOrdersByAccountId(accountId))
  console.log("order id ***  data ---> ", data)
  const ad: OrderDetailsType[] = data?.map((d: any) => {
    return {
      id: d._id,
      orderId: d.orderId,
      orderNumber: d.external3plOrderId,
      currentOrderStatus: d.orderStatus,
      poNumber: d.poNumber,
      reference: d?.reference || 'default reference',
      attentionTo: d.attentionTo,
      mot: d.mot,
      shippingCost: d.deliveryCost,
      totalAmount: d.totalAmount,
      specialInstruction: d?.specialInstruction || 'default special instruction'
    }
  })
  console.log("order id ***  data **  ---> ", ad)
  return {
    data: ad
  }
}