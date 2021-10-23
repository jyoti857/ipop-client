import { useDispatch } from 'react-redux'
import { createNewAccountAction, getAccountsAction } from './actions'
import CustomInput from '../../components/input/CustomInput'
import { useStyles } from './styles'
import FirstCard from './cards/firstCard'
import SecondCard from './cards/secondCard'
import { useState } from 'react'
import ThirdCard from './cards/thirdCard'
import CustomAccountForm from '../../utils/useCustomAccountFormik'

export interface UseAccountProps {
  accountName: string;
  ein: string;
  subtype: string;
  street1address: string;
  street2address: string;
  street3address: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  phone: string;
  handleClose?: any;
  filetype?: string;
}


const UseAccountFormik = ({ handleClose }: Partial<UseAccountProps>) => {
  const dispatch = useDispatch()
  const classes = useStyles();
  const [cardState, setCardState] = useState('first')
  const onSubmit = () => {
    const { accountName, ein, subtype, phone, city, email, state, street1address, street2address, street3address, zip } = values;
    dispatch(createNewAccountAction({ accountName, ein, subtype, phone, city, email, state, street1address, street2address, street3address, zip }))
    console.log("email and password from use custom formik ---> ", accountName, ein, subtype);
    handleClose(false)
    dispatch(getAccountsAction())
  }
  const { handleChange, values, handleSubmit } = CustomAccountForm({ onSubmit })
  const modalCard = (cardType: string) => {
    switch (cardType) {
      case "first": {
        return <FirstCard handleChange={handleChange} classes={classes} values={values} setCardState={setCardState} />
      }
      case 'second': {
        return <SecondCard handleChange={handleChange} classes={classes} values={values} setCardState={setCardState} />
      }
      case 'third': {
        return <ThirdCard
          accountName={values.accountName}
          city={values.city}
          ein={values.ein}
          subtype={values.subtype}
          email={values.email}
          phone={values.phone}
          state={values.state}
          street1address={values.street1address}
          street2address={values.street2address}
          street3address={values.street3address}
          zip={values.zip}
          classes={classes}
          setCardState={setCardState}
        />
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {modalCard(cardState)}
    </form>
  )
}

export default UseAccountFormik;