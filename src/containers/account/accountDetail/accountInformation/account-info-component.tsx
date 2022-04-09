import { Button, Divider, Paper } from '@mui/material'
import React, { ReactElement, useEffect, useState } from 'react'
import { useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import CustomInput from '../../../../components/input/CustomInput';
import CustomizedRadios from '../../../../components/radio-button';
import { updateOneAccountAction } from '../../actions';
import { PaymentTermsEnum } from '../../UseAccountFormik';
import { AccountInformationType_ } from './accountInformation_';
import { useStyles } from './styles'
interface Props {
  data: any;
  isLoading: boolean
}

function AccountInfoComponent({ data, isLoading }: Props): ReactElement {
  const classes = useStyles();
  const [acc, setAcc] = useState<AccountInformationType_>(() => ({
    addressLine1: data?.addressLine1,
    attention: data?.attention,
    country: data?.country,
    ein: data?.ein,
    email: data?.email,
    name: data?.name,
    phone: data?.phone,
    state: data?.state,
    addressLine2: data?.addressLine2,
    addressLine3: data?.addressLine3,
    city: data?.city,
    paymentType: data?.paymentTerms, //|| PaymentTermsEnum.NET45,
    accountStatus: data?.accountStatus,
    zip: data?.zip,
    apPhone: data?.apPhone,
    apEmail: data?.apEmail,
    hcpName: data?.hcpName,
    dun: data?.dun,
    taxId: data?.taxId,
    hcpNpi: data?.hcpNpi
  }))
  const [radioValue, setRadioValue] = useState("")
  const [clinicPhysicianLicenseNumber, setClinicPhysicianLicenseNumber] = useState('')
  const [addressLine2] = useState(data?.addressLine2)
  const [addressLine3, setAddressLine3] = useState(data?.addressLine3)
  const [hcpName] = useState(data?.hcpName)
  const [hcpNpi] = useState(data?.hcpNpi)

  console.log("data1 *& --> ", data)
  const [updateFlag] = useState(false);
  const queryClient = useQueryClient();

  const dispatch = useDispatch()

  const onSubmit = async() => {
    console.log("submit from update account!")
    await dispatch(updateOneAccountAction({
      ...acc,
      hcpName,
      hcpNpi,
      addressLine2,
      accountId: data._id
    }))
    queryClient.invalidateQueries('accountList')
  }

  useEffect(() => {
    const s = () => ({
      addressLine1: data?.addressLine1,
      attention: data?.attention,
      country: data?.country,
      ein: data?.ein,
      email: data?.email,
      name: data?.name,
      phone: data?.phone,
      state: data?.state,
      addressLine2: data?.addressLine2,
      addressLine3: data?.addressLine3,
      city: data?.city,
      paymentType: data?.paymentType,
      accountStatus: data?.accountStatus,
      zip: data?.zip,
      apPhone: data?.apPhone,
      apEmail: data?.apEmail,
      hcpName: data?.hcpName,
      dun: data?.dun,
      taxId: data?.taxId,
      hcpNpi: data?.hcpNpi
    })
    setAcc(s())
    console.log("acc *& --> ", radioValue, data?.paymentType)
  }, [data])
  useEffect(() => {

    setRadioValue(acc.paymentType === PaymentTermsEnum.PREPAID ? "prepaid" : 'net45')
  }, [acc.paymentType])

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAcc({ ...acc, paymentType: event.target.value as unknown as PaymentTermsEnum })
    setRadioValue(event.target.value)
  }
  {
    return (
      isLoading ? (<>Loading</>) : 
        <div>
          {!isLoading ?
        <Paper className={classes.paper} style={{ position: 'relative' }}>
          <Button
            style={{ position: 'absolute', top: 10, right: 10, marginBottom: 12 }}
            type='submit'
            onClick={onSubmit}
            disabled={updateFlag}
              >Save</Button>
          <Divider style={{ marginTop: 43, marginBottom: 12 }} />
          <div className={classes.rowWrap}>
            <div className={classes.inputWrap}>
              <label className={classes.label}>Account Name</label>
              <CustomInput
                value={acc.name}
                handleChange={(e: React.ChangeEvent<any>) => setAcc({ ...acc, name: e.target.value })}
                name='accountName'
                type='text'
                placeholder=''
                classNames={classes.fields}
                style={{ margin: 10 }}
              />
            </div>
            <div className={classes.inputWrap}>
              <label className={classes.label}>Attention</label>
              <CustomInput
                value={acc.attention}
                name='attention'
                type='text'
                placeholder=''
                classNames={classes.fields}
                handleChange={(e: React.ChangeEvent<any>) => setAcc({ ...acc, attention: e.target.value })}
                style={{ margin: 10 }}
              />
            </div>
          </div>
          <div className={classes.rowWrap}>
            <div className={classes.inputWrap}>
              <label className={classes.label}>Clinic/ Physician License Number</label>
              <CustomInput
                    value={clinicPhysicianLicenseNumber}
                name='Clinic/ Physician License Number'
                type='text'
                placeholder=''
                classNames={classes.fields}
                    handleChange={(e: React.ChangeEvent<any>) => setClinicPhysicianLicenseNumber(e.target.value)}
                style={{ margin: 10 }}
              />
            </div>
            <div className={classes.inputWrap}>
              <label className={classes.label}>EIN #</label>
              <CustomInput
                value={acc.ein}
                name='ein'
                type='text'
                placeholder=''
                classNames={classes.fields}
                handleChange={(e: React.ChangeEvent<any>) => setAcc({ ...acc, ein: e.target.value })}
                style={{ margin: 10 }}
              />
            </div>
          </div>
          <div className={classes.rowWrap}>
            <div className={classes.inputWrap}>
              <label className={classes.label}>Phone</label>
              <CustomInput
                value={acc.phone}
                name='phone'
                    type='number'
                placeholder=''
                classNames={classes.fields}
                handleChange={(e: React.ChangeEvent<any>) => setAcc({ ...acc, phone: e.target.value })}
                style={{ margin: 10 }}
              />
            </div>
            <div className={classes.inputWrap}>
              <label className={classes.label}>Email</label>
              <CustomInput
                value={acc.email}
                name='email'
                    type='email'
                placeholder=''
                classNames={classes.fields}
                handleChange={(e: React.ChangeEvent<any>) => setAcc({ ...acc, email: e.target.value })}
                style={{ margin: 10 }}
              />
            </div>
          </div>
          <div className={classes.rowWrap}>
            <div className={classes.inputWrap}>
              <label className={classes.label}>Affiliated HCP Name</label>
              <CustomInput
                    value={acc.hcpName}
                name='hcpname'
                type='text'
                placeholder=''
                classNames={classes.fields}
                    handleChange={(e: React.ChangeEvent<any>) => setAcc({ ...acc, hcpName: e.target.value })}
                style={{ margin: 10 }}
              />
            </div>
            <div className={classes.inputWrap}>
              <label className={classes.label}>Affiliated HCP NPI #</label>
              <CustomInput
                    value={acc.hcpNpi}
                name='hcpnpi'
                type='text'
                placeholder=''
                classNames={classes.fields}
                    handleChange={(e: React.ChangeEvent<any>) => setAcc({ ...acc, hcpNpi: e.target.value })}
                style={{ margin: 10 }}
              />
            </div>
          </div>
          <Divider style={{ marginTop: 23, marginBottom: 12 }} />
          <div className={classes.rowWrap}>
            <div className={classes.inputWrap}>
                  <label className={classes.label}>Ship To Street 1*</label>
              <CustomInput
                value={acc.addressLine1}
                name='addressline1'
                type='text'
                placeholder=''
                classNames={classes.fields}
                handleChange={(e: React.ChangeEvent<any>) => setAcc({ ...acc, addressLine1: e.target.value })}
                style={{ margin: 10 }}
                  />
            </div>
            <div className={classes.inputWrap}>
              <label className={classes.label}>Ship To Street 2</label>
              <CustomInput
                    value={acc.addressLine2}
                    name='addressline2'
                    type='text'
                    placeholder=''
                    classNames={classes.fields}
                    handleChange={(e: React.ChangeEvent<any>) => setAcc({ ...acc, addressLine2: e.target.value })}
                style={{ margin: 10 }}
              />
            </div>
          </div>
          <div className={classes.rowWrap}>
            <div className={classes.inputWrap}>
              <label className={classes.label}>Ship To Street 3</label>
              <CustomInput
                    value={addressLine3}
                name='addressline3'
                type='text'
                placeholder=''
                classNames={classes.fields}
                    handleChange={(e: React.ChangeEvent<any>) => setAddressLine3(e.target.value)}
                style={{ margin: 10 }}
              />
            </div>
            <div className={classes.inputWrap}>
              <label className={classes.label}>Ship To City *</label>
              <CustomInput
                value={acc.city}
                name='city'
                type='text'
                placeholder=''
                classNames={classes.fields}
                handleChange={(e: React.ChangeEvent<any>) => setAcc({ ...acc, city: e.target.value })}
                style={{ margin: 10 }}
                  />
            </div>
          </div>
          <div className={classes.rowWrap}>
            <div className={classes.inputWrap}>
              <label className={classes.label}>Ship To State *</label>
              <CustomInput
                    value={acc.state}
                    name='state'
                    type='text'
                    placeholder=''
                    classNames={classes.fields}
                    handleChange={(e: React.ChangeEvent<any>) => setAcc({ ...acc, state: e.target.value })}
                    style={{ margin: 10 }}
                  />
            </div>
            <div className={classes.inputWrap}>
              <label className={classes.label}>Ship To Zip Code *</label>
              <CustomInput
                    value={acc.zip}
                    name='zipcode'
                    type='text'
                    placeholder=''
                    classNames={classes.fields}
                    handleChange={(e: React.ChangeEvent<any>) => setAcc({ ...acc, zip: e.target.value })}
                    style={{ margin: 10 }}
                  />
            </div>
          </div>
          <div className={classes.rowWrap}>
            <div className={classes.inputWrap}>
              <label className={classes.label}>Ship To AP Contact Phone *</label>
              <CustomInput
                    value={acc.apPhone}
                    name='apPhone'
                    type='number'
                    placeholder=''
                    classNames={classes.fields}
                    handleChange={(e: React.ChangeEvent<any>) => setAcc({ ...acc, apPhone: e.target.value })}
                    style={{ margin: 10 }}
                  />
            </div>
            <div className={classes.inputWrap}>
              <label className={classes.label}>Ship To AP Contact Email *</label>
              <CustomInput
                    value={acc.apEmail}
                name='apemail'
                    type='email'
                placeholder=''
                classNames={classes.fields}
                    handleChange={(e: React.ChangeEvent<any>) => setAcc({ ...acc, apEmail: e.target.value })}
                    style={{ margin: 10 }}
                  />
            </div>
              </div>
              <Divider />
              <div className={classes.inputWrap} style={{ marginLeft: 10, marginTop: 10 }}>
                <CustomizedRadios
                  isDisabled={data?.paymentType === PaymentTermsEnum.NET45}
                  radioValue={radioValue}
                  handleChange={handleRadioChange}
                  title="Preferred Payment Tems"
                  options={[
                    { label: "Prepay Account (Credit Card)", value: "prepaid" },
                    { label: "Payment Terms (Net 45)", value: 'net45' }]}
                />
              </div>
              <Divider style={{ margin: '10px' }} />
          <div className={classes.rowWrap}>
            <div className={classes.inputWrap}>
              <label className={classes.label}>EIN/Tax ID of Financially Responsible Entity *</label>
              <CustomInput
                    value={acc.taxId}
                name='taxid'
                type='text'
                placeholder=' '
                classNames={classes.fields}
                    handleChange={(e: React.ChangeEvent<any>) => setAcc({ ...acc, taxId: e.target.value })}
                style={{ margin: 10 }}
                  />
            </div>
            <div className={classes.inputWrap}>
              <label className={classes.label}>DUN #</label>
              <CustomInput
                    value={acc.dun}
                name='dun'
                type='text'
                placeholder=''
                classNames={classes.fields}
                    handleChange={(e: React.ChangeEvent<any>) => setAcc({ ...acc, dun: e.target.value })}
                style={{ margin: 10 }}
              />
            </div>
          </div>
        </Paper>
            : <div>Loading ,,,</div>
      }
    </div>
  )
  }
}

export default AccountInfoComponent
