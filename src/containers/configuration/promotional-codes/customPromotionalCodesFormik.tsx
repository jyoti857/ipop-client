
import { useFormik } from 'formik'
import React from 'react'

export type usePromotionalCodesPrpos = {
  code: string;
  startDate: string;
  endDate: string;
  defaultCode: boolean;
  canEditPrice: boolean;
  adminOrderOnly: boolean;
  isCustom: boolean;
  description: string;
}
type Props = {
  onSubmit?: any
}

function CustomPromotionalCodesFormik({ onSubmit }: Props) {
  const { handleChange, handleSubmit, handleBlur, values } = useFormik<usePromotionalCodesPrpos>({
    initialValues: {
      code: '',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      defaultCode: false,
      canEditPrice: false,
      adminOrderOnly: false,
      isCustom: false,
      description: ""
    },
    onSubmit
  })
  return { handleBlur, handleChange, handleSubmit, values }
}

export default CustomPromotionalCodesFormik