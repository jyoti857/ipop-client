import { Divider, Paper } from '@mui/material';
import { ReactElement, useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import CustomInput from '../../../components/input/CustomInput'
import { ReducersType } from '../../../reducers/rootReducers';
import { getAccountByIdAction } from '../actions';
import { useStyles } from './styles'

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
  const params = useParams<{ accountId: string }>();
  const [accountDetail, setAccountDetail] = useState<AccountDetailType>()
  const dispatch = useDispatch();
  const getAccountDetail = () => {
    dispatch(getAccountByIdAction(params.accountId));
  };
  useEffect(() => {
    getAccountDetail();
  }, []);
  const account = useSelector((state: ReducersType) => state.accountReducers, shallowEqual);
  useEffect(() => {
    setAccountDetail(account)
  }, [accountDetail])
  return (
    <div>
      <Paper className={classes.paper}>
        <Divider style={{ marginTop: 23, marginBottom: 12 }} />
        <div>
          <CustomInput
            value={accountDetail?.name || ''}
            name='accountName'
            type='text'
            placeholder='Account Name'
            classNames={classes.fields}
          />
          <CustomInput
            value={+accountDetail?.attention! || ''}
            name='attention'
            type='text'
            placeholder='Attention'
            classNames={classes.fields}
          />
        </div>
        <div>
          <CustomInput
            value={accountName}
            name='Clinic/ Physician License Number'
            type='text'
            placeholder='Clinic/ Physician License Number'
            classNames={classes.fields}
          />
          <CustomInput
            value={accountDetail?.ein || ''}
            name='ein'
            type='text'
            placeholder='EIN #'
            classNames={classes.fields}
          />
        </div>
        <div>
          <CustomInput
            value={phone}
            name='accountName'
            type='text'
            placeholder='Phone'
            classNames={classes.fields}
          />
          <CustomInput
            value={email}
            name='accountName'
            type='text'
            placeholder='Email'
            classNames={classes.fields}
          />
        </div>
        <div>
          <CustomInput
            value={accountName}
            name='accountName'
            type='text'
            placeholder='Affiliated HCP Name'
            classNames={classes.fields}
          />
          <CustomInput
            value={accountName}
            name='accountName'
            type='text'
            placeholder='Affiliated HCP NPI #'
            classNames={classes.fields}
          />
        </div>
        <Divider style={{ marginTop: 23, marginBottom: 12 }} />
        <div>
          <CustomInput
            value={accountName}
            name='accountName'
            type='text'
            placeholder='Account Name'
            classNames={classes.fields}
          />
          <CustomInput
            value={accountName}
            name='accountName'
            type='text'
            placeholder='Account Name'
            classNames={classes.fields}
          />
        </div>
        <div>
          <CustomInput
            value={accountName}
            name='accountName'
            type='text'
            placeholder='Account Name'
            classNames={classes.fields}
          />
          <CustomInput
            value={accountName}
            name='accountName'
            type='text'
            placeholder='Account Name'
            classNames={classes.fields}
          />
        </div>
        <div>
          <CustomInput
            value={accountName}
            name='accountName'
            type='text'
            placeholder='Account Name'
            classNames={classes.fields}
          />
          <CustomInput
            value={accountName}
            name='accountName'
            type='text'
            placeholder='Account Name'
            classNames={classes.fields}
          />
        </div>
        <div>
          <CustomInput
            value={accountName}
            name='accountName'
            type='text'
            placeholder='Account Name'
            classNames={classes.fields}
          />
          <CustomInput
            value={accountName}
            name='accountName'
            type='text'
            placeholder='Account Name'
            classNames={classes.fields}
          />
        </div>
        <div>
          <CustomInput
            value={accountName}
            name='accountName'
            type='text'
            placeholder='Account Name'
            classNames={classes.fields}
          />
          <CustomInput
            value={accountName}
            name='accountName'
            type='text'
            placeholder='Account Name'
            classNames={classes.fields}
          />
        </div>
        <div>
          <CustomInput
            value={accountName}
            name='accountName'
            type='text'
            placeholder='Account Name'
          />
          <CustomInput
            value={accountName}
            name='accountName'
            type='text'
            placeholder='Account Name'
          />
        </div>
      </Paper>
    </div>
  )
}

export default AccountDetail