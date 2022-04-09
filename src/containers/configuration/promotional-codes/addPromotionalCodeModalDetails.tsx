import React, { useEffect, useState } from 'react'
import CustomDatePicker from '../../../components/calendar'
import CustomInput from '../../../components/input/CustomInput'
import { addDays } from '../../../utils/dateFunctions';
import CustomAccountPriceQuoteFormik from '../../account/accountDetail/accountPriceQuoteFormik';
import { useQuery, useMutation } from 'react-query'
import { createPromotionalCode } from '../../../utils/baseUrl';
import CustomPromotionalCodesFormik from './customPromotionalCodesFormik';
import CustomizedRadios from '../../../components/radio-button';
import { radioBoolean } from '../common/radioData';
type Props = {
  triggerOnSubmit: boolean;
  products: any[]
}

function AddPromotionalCodeModalDetails({ triggerOnSubmit, products }: Props) {
  const currentDate = new Date();
  const [date, setDate] = useState({ startDate: currentDate.toISOString().split('T').toString(), endDate: addDays(currentDate, 60).toISOString().split("T")[0] })
  const mutation = useMutation(createPromotionalCode);
  const [radioValue, setRadioValue] = useState({
    canEditPrice: false,
    defaultCode: false,
    adminOrderOnly: false,
    isCustom: false
  })
  // handle radio change 
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("e handle radio ----->", e.target)
    setRadioValue({
      ...radioValue,
      [e.target.name]: e.target.value === 'true' ? true : false
    })
  }
  console.log("e handle ", radioValue)
  const onHandleCreatePromotionalCodesSubmit = async () => {
    const { defaultCode, canEditPrice, adminOrderOnly, isCustom } = radioValue
    await mutation.mutateAsync({ code, startDate, endDate, description, defaultCode, canEditPrice, adminOrderOnly, isCustom, products })
  }

  const { handleSubmit, handleChange, values: { code, endDate, startDate, description, defaultCode, canEditPrice, adminOrderOnly, isCustom } } = CustomPromotionalCodesFormik({ onSubmit: onHandleCreatePromotionalCodesSubmit })

  useEffect(() => {
    if (triggerOnSubmit) {
      handleSubmit();
    }
  }, [triggerOnSubmit])
  return (
    <div style={{ padding: 23, }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <CustomInput name='code' placeholder={''} label='Code' type='text' value={code} handleChange={handleChange} />
        <CustomDatePicker name='startDate' label='Start Date' value={date.startDate}  //no effect on name attribute here in this component 
          handleDateChange={(newDate: string) => {
            setDate({
              ...date,
              startDate: newDate
            })
          }} />
        <CustomDatePicker name='endDate' label='End Date' value={date.endDate}
          handleDateChange={(newDate: string) => {
            setDate({
              ...date,
              endDate: newDate
            })
          }}
        />
      </div>
      <div style={{ margin: 12, display: 'flex', justifyContent: 'space-between' }}>
        <CustomizedRadios name='defaultCode' title='Default Code' radioValue={radioValue.defaultCode} options={radioBoolean} handleChange={handleRadioChange} />
        <CustomizedRadios name='canEditPrice' title='Can Edit Price' radioValue={radioValue.canEditPrice} options={radioBoolean} handleChange={handleRadioChange} />
        <CustomizedRadios name='adminOrderOnly' title='Admin Order Only' radioValue={radioValue.adminOrderOnly} options={radioBoolean} handleChange={handleRadioChange} />
        <CustomizedRadios name='isCustom' title='Is Custom' radioValue={radioValue.isCustom} options={radioBoolean} handleChange={handleRadioChange} />
      </div>
      <CustomInput name='description' placeholder={''} label='Description' type='text' value={description} handleChange={handleChange} />
    </div>
  )
}

export default AddPromotionalCodeModalDetails