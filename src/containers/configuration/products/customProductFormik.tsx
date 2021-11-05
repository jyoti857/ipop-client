import { useFormik } from 'formik'


export type UseProductProps = {
  name: string;
  catalog: string;
  price: number;
}
type CustomProductFormType = {
  onSubmit?: any
}
const CustomProductForm = ({ onSubmit }: CustomProductFormType) => {
  const { handleChange, handleBlur, handleSubmit, values, } = useFormik<UseProductProps>({
    initialValues: {
      catalog: "1601 IST0221",
      name: "iovera° System Handpiece and Docking Station",
      price: 239
    },
    onSubmit
  })
  return { handleBlur, handleChange, handleSubmit, values }
}

export default CustomProductForm;