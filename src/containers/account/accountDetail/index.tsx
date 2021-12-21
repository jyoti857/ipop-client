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
  { label: "AccountInformation", idx: 0 },
  { label: "CreditInformation", idx: 1 },
  { label: "SupportingDocuments", idx: 2 },
  { label: "Purchaser", idx: 3 },
  { label: "AccountPrice", idx: 4 },
  { label: "Quotes", idx: 5 },
]
function AccountDetail(): ReactElement {
  const classes = useStyles();
  const [tabName, setTabName] = useState('AccountInformation');
  const params = useParams<{ accountId: string }>();
  const [accData, setAccData] = useState(JSON.parse(localStorage.getItem(params.accountId)!));
  console.log("acc data **---> ", accData, params.accountId)
  const [value, setValue] = useState(0)
  const handleChange = (e: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
    setTabName(accountTabs.find(c => c.idx === newValue)?.label!)
  }
  function showTabPage(tabName: string): ReactElement {
    switch (tabName) {
      case 'AccountInformation': {
        return <AccountInformation />
      }
      case 'SupportingDocuments': {
        return <SupportingDocuments />
      }
      case 'Purchaser': {
        return <Purchaser />
      }
      case 'AccountPrice': {
        return <AccountPrice />
      }
      case 'Quotes': {
        return <Quotes />
      }
      default: return <div style={{ height: 23, width: 160, margin: '80px auto', alignSelf: 'center', backgroundColor: 'green', color: 'white', display: 'flex', borderRadius: 2 }}>Under development</div> // <SupportingDocuments />
    }
  }

  return (
    <div style={{ marginTop: 23 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: 1200 }}>
        <div style={{ width: '40%', backgroundColor: 'red' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
            <div style={{ marginLeft: 12, marginRight: 12, fontSize: 20, fontWeight: 'bolder' }}>{accData?.name}</div>
            <div style={{ backgroundColor: 'limegreen', padding: 4, textAlign: 'center', borderRadius: 8, }}>{accData?.accountStatus}</div>
          </div>
          <div style={{ display: 'flex', marginLeft: 12, justifyContent: 'flex-start' }}>
            <div>{accData?.addressLine1},</div>
            <div>{accData?.city},</div>
            <div>{accData?.country}</div>
            <div>{accData?.email}</div>
          </div>
        </div>
        <div>
          <Button
            variant='contained'
            color='primary'
          >Submit for approval</Button>
        </div>
      </div>
      <AccountTabs tabs={accountTabs} tab={tabName} value={value} handleChange={handleChange} />
      {showTabPage(tabName)}
    </div>
  )
}

export default AccountDetail