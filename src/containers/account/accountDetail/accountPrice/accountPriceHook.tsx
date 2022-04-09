import * as React from 'react';
import { useQuery } from 'react-query'
import { getAllProducts } from '../../../../utils/baseUrl';
const { useState, useEffect } = React

export const AccountPriceHook = () => {
  const { data, isLoading } = useQuery('getProducts', getAllProducts, { enabled: true });
  console.log("sopw --->", data)
  const [proposedPrice, setProposedPrice] = useState(!isLoading ? data : [])
  const [proposedPriceFromData, setProposedPriceFromData] = useState(!isLoading ? data.map((d: any) => d.price) : [])
  const [discountPrice, setDiscountPrice] = useState(data?.map((d: any, i: number) => !isLoading && (data[i].price - proposedPriceFromData[i]) * 0.01))
  const [discountPriceUpdateFlag, setDiscountPriceUpdateFlag] = useState(false)
  const handleProposedData = (e: any, id: number) => {
    const sd = [...proposedPriceFromData]
    if (e.target.value > data?.map((d: any) => d.price)[id]) {
      console.log("from data ***", proposedPriceFromData[id])
      setProposedPriceFromData(proposedPriceFromData)
    } else {
      sd[id] = e.target.value;
      setProposedPriceFromData(sd)
    }
    setDiscountPriceUpdateFlag(!discountPriceUpdateFlag)
    console.log("from data ***, proposed", proposedPriceFromData)
    // setDiscountPrice(dis)
  }
  useEffect(() => { calculateDiscountPrice() }, [discountPriceUpdateFlag])
  const calculateDiscountPrice = () => {
    const dis = data?.map((d: any, i: number) => (((d.price - proposedPriceFromData[i]) / d.price) * 100).toFixed(2))
    setDiscountPrice(dis)
  }

  useEffect(() => { }, [data])

  useEffect(() => {
    setProposedPrice(data)
  }, [isLoading])
  return data ? {
    data, isLoading, discountPrice, handleProposedData, proposedPrice, proposedPriceFromData
  } : {}
}