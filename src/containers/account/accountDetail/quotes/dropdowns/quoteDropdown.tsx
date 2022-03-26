import { SelectChangeEvent } from '@mui/material'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { getAllPromotionalCodes } from '../../../../../utils/baseUrl'

type Props = {}

const quoteTypesData = [
  {
    value: "std",
    desc: "Standard"
  },
  {
    value: 'promo',
    desc: "Promotional"
  }
]
export function QuoteDropdown() {
  const { data }: { data: any } = useQuery('getAllPromotionalCodes', getAllPromotionalCodes)
  const subTypeData = data?.map((d: any) => ({ value: d._id, desc: d.code, products: d?.products }))
  const [quoteType, setQuoteType] = useState(quoteTypesData)
  const [quoteSubType, setQuoteSubType] = useState({})
  const [dropdown, setDropdown] = useState({ quote_type: '', quote_sub_type: '' })
  const handleDropdown = (e: SelectChangeEvent) => {
    console.log("quote dropdown handle --->", e.target, dropdown, data, subTypeData)
    setDropdown(
      {
        ...dropdown,
        [e.target.name]: e.target.value
      }
    )
  }
  return { quoteSubTypeData: subTypeData, quoteTypeData: quoteType, quoteDropdown: dropdown, handleQuoteDropdown: handleDropdown }
}

// export default QuoteDropdown    