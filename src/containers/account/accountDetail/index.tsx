import { Button, Divider, Paper } from '@mui/material';
import { ReactElement, useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom'
import { useQuery } from 'react-query'
import CustomInput from '../../../components/input/CustomInput'
import { ReducersType } from '../../../reducers/rootReducers';
import { getAccountByIdAction } from '../actions';
import { useStyles } from './styles'
import { getAccountById, updateAccountById } from '../../../utils/baseUrl';
import CustomAccountForm from '../../../utils/useCustomAccountFormik';
import AccountTabs from './accountTabs';
import AccountInformation from './accountInformation';
import SupportingDocuments from './supportingDocuments';
interface Props {
  accountName: string;
  ein: string;
  phone: string;
  email: string;
}
export type AccountDetailType = {
  name: string;
  attention: number;
  ein: string;
}

function AccountDetail({ accountName, ein, phone, email }: Props): ReactElement {
  const classes = useStyles();

  function showTabPage(tabName: string): ReactElement {
    switch (tabName) {
      case 'accountInformation': {
        return <AccountInformation />
      }
      default: return <SupportingDocuments />
    }
  }

  return (
    showTabPage("accountInformawtion")
  )
}

export default AccountDetail