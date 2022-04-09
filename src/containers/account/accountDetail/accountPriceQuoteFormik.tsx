import { useFormik } from "formik"


export type UseAccountPriceQuotes = {
  priceTitle: string;
  startDate: string;
  endDate: string;
}


const CustomAccountPriceQuoteFormik = ({ onSubmit }: any) => {
  const { handleChange, handleBlur, handleSubmit, values } = useFormik<UseAccountPriceQuotes>({
    initialValues: {
      endDate: "",
      startDate: "",
      priceTitle: "",
    },
    onSubmit
  })
  return { handleChange, handleBlur, handleSubmit, values }
}

export default CustomAccountPriceQuoteFormik;