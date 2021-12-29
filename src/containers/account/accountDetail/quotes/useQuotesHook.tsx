


import React, { ReactElement, useEffect, useState } from 'react'
import { useQueries, useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
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
  const activeAP = data?.filter((d: any) => d.account === 'Active')
  console.log("quotes data ---> ", data)
  // useEffect(() => {
  //   setDataQuotes(data)
  // }, [data])

  return { isLoading, isError, accountPriceData: data, productWithPrice: data?.productWithPrice }
}

export default useQuotesHook
