import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { getOrdersByAccountId, getQuotesByAccountId } from "../../../../utils/baseUrl"


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
  quote: any
}

export const useOrderHook = () => {

  const { accountId } = useParams<{ accountId: string }>()
  const { data, isLoading, isError }: { data: any, isLoading: boolean, isError: boolean } = useQuery(['order, `${accountId}`'], () => getOrdersByAccountId(accountId))
  console.log("order id ***  data ---> ", data);

  // fetch the all the quotes created 
  const { data: quoteData }: { data: any } = useQuery(['getQuotesByAccountId', accountId], () => getQuotesByAccountId(accountId))

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
      specialInstruction: d?.specialInstruction || 'default special instruction',
      quote: d.quote
    }
  })
  console.log("order id ***  data **  ---> ", ad)


  const quotes = quoteData?.map((quote: any) => ({
    id: quote._id,
    title: quote.title,
    status: quote.status,
    productQuotes: quote.productQuotes
  }))
  return {
    data: ad, isLoading,
    quotes
  }
}