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


  const params = useParams<{ accountId: string }>();
  const { data, isLoading } = useQuery(['accountInformation', params.accountId], () => getAccountById(params.accountId),
    { enabled: Boolean(params.accountId) }
  )
  return (
    isLoading ? <div>Loading,,,,from account info component render method </div> :
      <div><AccountInfoComponent data={data} isLoading={isLoading} /></div>
  )
}

export default AccountInformation;