import * as React from 'react';
import { useQuery } from 'react-query'
import { getAllProducts } from '../../../../utils/baseUrl';
const { useState, useEffect } = React

export const AccountPriceHook = () => {
  const { data } = useQuery('getProducts', getAllProducts, { enabled: Boolean(true) });
  console.log("sopw --->", data)
  // const [data_, setData_] = useState([]);
  const [proposedPrice] = useState(data ? data : [])
  const [proposedPriceFromData, setProposedPriceFromData] = useState(data && data.length > 0 ? data.map((d: any) => d.price) : [])
  const [discountPrice, setDiscountPrice] = useState(data?.map((d: any, i: number) => data.length > 0 && proposedPriceFromData.length > 0 && (data[i].price - proposedPriceFromData[i]) * 0.01))
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
    console.log("from data ***, proposed", proposedPriceFromData[id])
    // setDiscountPrice(dis)
  }
  React.useEffect(() => { calculateDiscountPrice() }, [discountPriceUpdateFlag])
  const calculateDiscountPrice = () => {
    const dis = data?.map((d: any, i: number) => (((d.price - proposedPriceFromData[i]) / d.price) * 100).toFixed(2))
    setDiscountPrice(dis)
  }
  React.useEffect(() => {
    if (data) {
      console.log("sopw ---> inside useEffect")
      const s = data?.map((d: any, i: number) => data.length > 0 && (data[i].price - proposedPriceFromData[i]) * 0.01)
      // setDiscountPrice(s)
    }
  }, [])
  return {
    discountPrice, handleProposedData, proposedPrice, proposedPriceFromData
  }
}