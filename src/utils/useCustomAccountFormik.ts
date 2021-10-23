import { useFormik } from 'formik'
import { UseAccountProps } from '../containers/account/UseAccountFormik'


type CustomAccountFormType = {
  onSubmit?: any
}
const CustomAccountForm = ({onSubmit}: CustomAccountFormType) => {
  const { handleChange, handleBlur, handleSubmit, values, } = useFormik<UseAccountProps>({
    initialValues: {
      accountName: 'STANFORD UNIVERSITY MEDICAL CE',
      ein: '2324234',
      subtype: 'HDOP',
      phone: '3213123',
      city: 'THEMVEL12',
      email: 'asd@lds.com',
      state: 'PA',
      street1address: 'e2043423',
      street2address: '32234',
      street3address: '324234',
      zip: '93020',
      filetype: '2'
    },
    onSubmit
  })
  return {handleBlur, handleChange, handleSubmit, values}
}

export default CustomAccountForm;