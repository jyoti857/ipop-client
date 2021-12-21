import { Button, Divider, Paper } from '@mui/material';
import { ReactElement, useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom'
import { useQuery } from 'react-query'
import CustomInput from '../../../../components/input/CustomInput'
import { ReducersType } from '../../../../reducers/rootReducers';
import { getAccountByIdAction } from '../../actions';

import { getAccountById, updateAccountById } from '../../../../utils/baseUrl';
import CustomAccountForm from '../../../../utils/useCustomAccountFormik';
import AccountTabs from '../accountTabs';
import { AccountInformationType_ } from './accountInformation_';
import { PaymentTermsEnum } from '../../UseAccountFormik';
import AccountInfoComponent from './account-info-component';
interface Props {
  // accountName: string;
  // ein: string;
  // phone: string;
  // email: string;
}
export type AccountInformationType = {
  name: string;
  attention: string;
  ein: string;
}
function AccountInformation({ }: Props): ReactElement {

  const history = useHistory()
  const params = useParams<{ accountId: string }>();
  const [accountInformation, setaccountInformation] = useState<AccountInformationType>()
  const dispatch = useDispatch();
  const { data } = useQuery(['accountInformation', params.accountId], () => getAccountById(params.accountId),
    { enabled: Boolean(params.accountId) }
  )

  const [updateFlag, setUpdateFlag] = useState(false);


  const [count, setCount] = useState(0)
  const [acc, setAcc] = useState<any>()
  const { data: updateFields } = useQuery('updateAccountInformation',
    () => updateAccountById(params.accountId,
      {
        name: acc.name,
        phone: acc.phone,
        city: acc.city,
        addressLine1: acc.addressLine1,
        email: acc.email,
        addressLine2: acc.addressLine2_,
        attention: acc.attention,
        state: acc.state,
        addressLine3: acc.addressLine3,
        ein: acc.ein,
        paymentType: PaymentTermsEnum.NET45
      }),
    { enabled: Boolean(updateFlag) }
  )
  console.log("data fetching ---> ", updateFields, acc, 'data --> ', data)



  useEffect(() => {
    setAcc({
      ...acc,
      name: data?.name,
      attention: data?.attention,
      ein: data?.ein,
      phone: data?.phone,
      email: data?.email,
      addressLine1: data?.addressLine1,
      state: data?.state,
      country: data?.country,
      accountStatus: data?.accountStatus
    })
    setUpdateFlag(false)
    // setting the account data globally
    // localStorage.setItem(params.accountId, JSON.stringify(data))
  }, [data])
  useEffect(() => {
    setAcc({
      ...acc,
      name: updateFields?.name,
      attention: updateFields?.attention,
      ein: updateFields?.ein,
      phone: updateFields?.phone,
      email: updateFields?.email,
      addressLine1: updateFields?.addressLine1,
      state: updateFields?.state,
      country: updateFields?.country
    })
    // localStorage.setItem(params.accountId, JSON.stringify(updateFields))
    setUpdateFlag(false)
  }, [updateFields])

  useEffect(() => {
    localStorage.setItem(params.accountId, JSON.stringify(acc))
    console.log("acc data * 0<", acc, data)
  }, [acc])

  const onSubmit = () => {
    console.log("setupdate flag --->", updateFlag)

    setUpdateFlag(true)
  }
  const { handleChange, values } = CustomAccountForm({ onSubmit })
  return (
    <div>
      {/* <AccountTabs /> */}
      <AccountInfoComponent onSubmit={onSubmit} data={data} />
    </div>
  )
}

export default AccountInformation;