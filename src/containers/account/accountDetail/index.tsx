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

const accountTabs = [
  { label: "accountInformation", idx: 0 },
  { label: "creditInformation", idx: 0 },
  { label: "supportingDocuments", idx: 0 },
  { label: "purchaser", idx: 0 },
  { label: "accountPrice", idx: 0 },
  { label: "quotes", idx: 0 },
]
function AccountDetail({ accountName, ein, phone, email }: Props): ReactElement {
  const classes = useStyles();
  const [tabName, setTabName] = useState('');
  const [value, setValue] = useState(0)
  const handleChange = (e: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
    setTabName(accountTabs.find(c => c.idx === newValue)?.label!)
  }
  function showTabPage(tabName: string): ReactElement {
    switch (tabName) {
      case 'accountInformation': {
        return <AccountInformation />
      }
      case 'purchaser': {
        return <SupportingDocuments />
      }
      default: return <SupportingDocuments />
    }
  }

  return (
    <div>
      <AccountTabs tabs={accountTabs} tab={tabName} value={value} handleChange={handleChange} />
      {showTabPage(tabName)}
    </div>
  )
}

export default AccountDetail