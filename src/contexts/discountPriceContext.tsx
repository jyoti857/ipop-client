
import React, { useState, createContext, useReducer } from 'react'
import DGAccordion from '../components/accordion/dg_accordion'
import DiscountGroups from '../containers/configuration/discount-groups'

export const DiscountPriceContext = createContext<any>('')

const initialState = {
  clickedDiscountPrice: {},
  editModal: true,
  flower: "tulip"
}
const discountPriceReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SELECT_DISCOUNT_PRICE': {
      const { payload: { row, isModalOpen } } = action
      return { ...state, clickedDiscountPrice: row, editModal: isModalOpen }
    }
    default: {
      return state;
    }
  }
}
const DiscountPriceProvider = ({ children }: any) => {
  const [selectedDiscountPrice, setSelectedDiscountPrice] = useState('')
  const [state, dispatch] = useReducer(discountPriceReducer, initialState)
  return (
    <DiscountPriceContext.Provider value={{ state, dispatch }}>
      {children}
    </DiscountPriceContext.Provider>
  )
}

export default DiscountPriceProvider;