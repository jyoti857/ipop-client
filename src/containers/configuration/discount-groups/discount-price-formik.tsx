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
      name: '',
      startDate: '',
      endDate: '',
      desc: ''
    },
    onSubmit
  })
}

export default CustomDiscountPriceFormik;