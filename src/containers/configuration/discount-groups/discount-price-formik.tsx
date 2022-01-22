import { useFormik } from "formik"

export type UseDiscountPriceProps = {
  name: string;
  startDate: string;
  endDate?: string;
  desc?: string;
  discountPriceList: any[]
}
type CustomDiscountPriceFormType = {
  onSubmit: any
}
const CustomDiscountPriceFormik = ({ onSubmit }: CustomDiscountPriceFormType) => {
  const { handleChange, handleBlur, handleSubmit, values } = useFormik<UseDiscountPriceProps>({
    initialValues: {
      name: 'year sale',
      startDate: '2021-11-23',
      endDate: '2021-11-29',
      desc: 'descsio',
      discountPriceList: []
    },
    onSubmit
  })
  return { handleChange, values }
}

export default CustomDiscountPriceFormik;