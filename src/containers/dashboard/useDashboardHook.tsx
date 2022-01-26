import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getAccountPriceInPendingStatus } from '../../utils/baseUrl';

///{ title: string, accountPriceType: string, accountId: string }[]
function useDashboardHook() {
  const { data, isLoading }
    = useQuery('pendingAllAccountPrices', getAccountPriceInPendingStatus) as unknown as { data: { title: string, accountPriceType: string, accountId: string }[] } & { isLoading: boolean }
  const dataArr = data?.map(({ title, accountPriceType, accountId }) => ({ title, accountPriceType, accountId }))
  const { data: accountList }: { data: any } = useQuery('accountList')
  console.log(" *****", dataArr, accountList,)
  const dataArr_ = dataArr?.map((ad) => ({
    title: ad.title,
    accountPriceType: "PRE_APPR" ? 'Discount Price' : "Standard",
    accountId: ad.accountId,
    accountName: accountList?.find((acc: any) => acc._id === ad.accountId).name,
  }))
  return { isLoading, dataArr: dataArr_ }
}

export default useDashboardHook;
