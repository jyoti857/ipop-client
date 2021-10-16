import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import AccountModal from '../../containers/account/AccountModal'
import { createNewAccountAction } from '../../containers/account/actions'
import CustomInput from './CustomInput'


export interface UseAccountProps {
  // children: typeof CustomInput,
  // onSubmit?: () => any
  accountName: string;
  ein: string;
  subtype: string;
}
const UseAccountFormik = () => {
  const dispatch = useDispatch()
  const onSubmit = () => {
    const { accountName, ein, subtype } = values;
    dispatch(createNewAccountAction({ accountName, ein, subtype }))
    console.log("email and password from use custom formik ---> ", accountName, ein, subtype)
  }
  const { handleChange, handleBlur, handleSubmit, values, } = useFormik<UseAccountProps>({
    initialValues: {
      accountName: '',
      ein: '',
      subtype: ''
    },
    onSubmit
    //: async () => typeof onSubmit === 'function' ? onSubmit() : {}
  })

  return (
    <form onSubmit={handleSubmit}>
      <CustomInput
        name='accountName'
        handleChange={handleChange}
        placeholder='account name'
        type='text'
        value={values.accountName}
      />
      <CustomInput
        name='ein'
        handleChange={handleChange}
        placeholder='EIN #'
        type='text'
        value={values.ein}
      />
      <CustomInput
        name='subtype'
        handleChange={handleChange}
        placeholder='Subtype'
        type='text'
        value={values.subtype}
      />
      <button type='submit'>submit</button>
    </form>
  )
}

export default UseAccountFormik;