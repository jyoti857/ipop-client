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
import Purchaser from './purchaser';
import AccountPrice from './accountPrice';
import Quotes from './quotes';
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
  { label: "creditInformation", idx: 1 },
  { label: "supportingDocuments", idx: 2 },
  { label: "purchaser", idx: 3 },
  { label: "accountPrice", idx: 4 },
  { label: "quotes", idx: 5 },
]
function AccountDetail({ accountName, ein, phone, email }: Props): ReactElement {
  const classes = useStyles();
  const [tabName, setTabName] = useState('accountInformation');
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
      case 'supportingDocuments': {
        return <SupportingDocuments />
      }
      case 'purchaser': {
        return <Purchaser />
      }
      case 'accountPrice': {
        return <AccountPrice />
      }
      case 'quotes': {
        return <Quotes />
      }
      default: return <div style={{ height: 23, width: 160, margin: '80px auto', alignSelf: 'center', backgroundColor: 'green', color: 'white', display: 'flex', borderRadius: 2 }}>Under development</div> // <SupportingDocuments />
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