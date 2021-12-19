import { useFormik } from "formik"

export type UseDiscountPriceProps = {
  name: string;
  startDate: string;
  endDate?: string;
  desc?: string;
}
type CustomDiscountPriceFormType = {
  onSubmit: any
}
const CustomDiscountPriceFormik = ({ onSubmit }: CustomDiscountPriceFormType) => {
  const { handleChange, handleBlur, handleSubmit, values } = useFormik<UseDiscountPriceProps>({
    initialValues: {
      name: 'discount #n',
      startDate: '2021-11-23',
      endDate: '2021-11-29',
      desc: 'descsio'
    },
    onSubmit
  })
  return { handleChange, values }
}

export default CustomDiscountPriceFormik;