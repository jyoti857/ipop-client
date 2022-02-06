import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getAccountPriceInPendingStatus } from '../../utils/baseUrl';

///{ title: string, accountPriceType: string, accountId: string }[]
function useDashboardHook() {
  const { data, isLoading }
    = useQuery('pendingAllAccountPrices', getAccountPriceInPendingStatus) as unknown as { data: { title: string, accountPriceType: string, accountId: { name: string } }[] } & { isLoading: boolean }
  const dataArr = data?.map(({ title, accountPriceType, accountId: { name } }) => ({ title, accountPriceType, accountName: name }))
  console.log("data Arr from hook --->", dataArr, data)
  const dataArr_ = dataArr?.map((ad) => ({
    title: ad.title,
    accountPriceType: "PRE_APPR" ? 'Discount Price' : "Standard",
    accountName: ad.accountName,
    //: "023"//accountList?.find((acc: any) => acc._id === ad.accountId)._id,
  }))
  return { isLoading, dataArr: dataArr_ }
}

export default useDashboardHook;
