


import React, { ReactElement, useEffect, useState } from 'react'
import { useQueries, useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { getAccountPricesByAccountId } from '../../../../utils/baseUrl'

interface Props {

}

function useQuotesHook(): any {
  const params = useParams<{ accountId: string }>()
  const { data } = useQuery(['accountPrice' + params.accountId], () => getAccountPricesByAccountId(params.accountId))
  const [dataQuotes, setDataQuotes] = useState(data)
  const activeAP = data?.filter((d: any) => d.account === 'Active')
  console.log("quotes data ---> ", data)
  // useEffect(() => {
  //   setDataQuotes(data)
  // }, [data])

  return { accountPriceData: data, productWithPrice: data?.productWithPrice }
}

export default useQuotesHook
