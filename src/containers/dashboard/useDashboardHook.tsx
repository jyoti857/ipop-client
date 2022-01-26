import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getAccountPriceInPendingStatus } from '../../utils/baseUrl';

///{ title: string, accountPriceType: string, accountId: string }[]
function useDashboardHook() {
  const { data, isLoading }
    = useQuery('pendingAllAccountPrices', getAccountPriceInPendingStatus) as unknown as { data: { title: string, accountPriceType: string, accountId: string }[] } & { isLoading: boolean }
  const dataArr = data?.map(({ title, accountPriceType, accountId }) => ({ title, accountPriceType, accountId }))
  console.log("data arr use*", dataArr)
  // const [dataArr, setDataArr] = useState<
  //   { title: string, accountId: string, accountPriceType: string }[]
  // // any
  // >(dataArr_)
  return { isLoading, dataArr }
}

export default useDashboardHook;
