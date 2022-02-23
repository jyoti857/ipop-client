import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getAccountPriceInPendingStatus } from '../../utils/baseUrl';

///{ title: string, accountPriceType: string, accountId: string }[]
function useDashboardHook() {
  const { data, isLoading }
    = useQuery('pendingAllAccountPrices', getAccountPriceInPendingStatus) as unknown as { data: { title: string, accountPriceType: string, accountId: { name: string, _id: string } }[] } & { isLoading: boolean }
  console.log("useDashboardHook ---> ", data)
  const dataArr = data?.map(({ title, accountPriceType, accountId: { name, _id } }) => ({ title, accountPriceType, accountName: name, accountId: _id }))
  console.log("data Arr from hook --->", dataArr, data)
  const dataArr_ = dataArr?.map((ad) => ({
    title: ad.title,
    accountPriceType: "PRE_APPR" ? 'Discount Price' : "Standard",
    accountName: ad.accountName,
    accountId: ad.accountId
    //: "023"//accountList?.find((acc: any) => acc._id === ad.accountId)._id,
  }))
  return { isLoading, dataArr: dataArr_ }
}

export default useDashboardHook;
