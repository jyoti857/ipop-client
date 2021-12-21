import { Button, Divider, Paper } from '@mui/material';
import { ReactElement, useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom'
import { useQuery } from 'react-query'
import CustomInput from '../../../../components/input/CustomInput'
import { ReducersType } from '../../../../reducers/rootReducers';
import { getAccountByIdAction, updateOneAccountAction } from '../../actions';

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
  const { data } = useQuery(['accountInformation', params.accountId], () => getAccountById(params.accountId),
    { enabled: Boolean(params.accountId) }
  )

  console.log("data *& --> ", data)
  // const { handleChange, values } = CustomAccountForm({ onSubmit })
  return (
    <div>
      <AccountInfoComponent data={data} />
    </div>
  )
}

export default AccountInformation;