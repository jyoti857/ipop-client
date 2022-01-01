


import React, { ReactElement, useEffect, useState } from 'react'
import { useQueries, useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { AccountPriceType } from '.'
import { getAccountPricesByAccountId } from '../../../../utils/baseUrl'

interface Props {

}

type useQuoteHookReturnType = {
  isLoading: boolean;
  isError: boolean;
  accountPriceData: any[];
  productWithPrice: any
}

function useQuotesHook(): useQuoteHookReturnType {
  const params = useParams<{ accountId: string }>()
  const { isLoading, isError, data } = useQuery(['accountPrice' + params.accountId], () => getAccountPricesByAccountId(params.accountId))
  const [dataQuotes, setDataQuotes] = useState(data)
  const [qties, setQties] = useState(0)
  const activeAP: AccountPriceType = data?.find((d: any) => d.status === 'Active')
  console.log("quotes data activeAP---> ", activeAP?.productWithPrice)
  const addQtyToProductPrice = activeAP?.productWithPrice.map((a: any) => ({ ...a, qty: 0 }))
  // useEffect(() => {
  //   setDataQuotes(data)
  // }, [data])

  const handleSetQties = () => {
    const sd = [...data]
  }

  return { isLoading, isError, accountPriceData: data, productWithPrice: addQtyToProductPrice }
}

export default useQuotesHook
