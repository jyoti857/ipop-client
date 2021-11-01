import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { loginDispatch } from './actions';
import { useStyles } from './styles'
import { useHistory } from 'react-router-dom'
import CustomInput from '../../components/input/CustomInput';
import Pages from '../header/pages';

interface Props {
  email: string;
  password: string;
}

const Login: React.FC<Props> = ({ email, password }) => {
  const classes = useStyles()
  const dispatch = useDispatch();
  const history = useHistory();
  const userRoleSelector = useSelector((state: any) => state.authReducers.userRole);
  const emailSelector = useSelector((state: any) => state.authReducers.email, shallowEqual);
  const loadingSelector = useSelector((state: any) => state.authReducers.loading, shallowEqual);
  const [emailUs, setEmailUs] = React.useState<Props>();
  const [userRole, setUserRole] = React.useState<any>();
  const [loading, setLoading] = useState(loadingSelector);
  const [userId, setUserId] = useState<string | null>('');
  const { handleChange, handleBlur, handleSubmit, values, } = useFormik<Props>({
    initialValues: {
      email,
      password
    },
    onSubmit: () => loginSubmit()
  })
  const loginSubmit = async () => {
    const { email, password } = values;
    dispatch(loginDispatch({ email, password }))
  }

  useEffect(() => {
    const sd = async () => {
      const _id = await localStorage.getItem('userid');
      _id && history.push(`/account/app-dashboard/${_id}`)
      setUserId(_id)
      setLoading(false)
    }
    sd();
  })
  // React.useEffect(() => {
  //   console.log("userrole selec", userRole?._id, emailSelector)
  //   const login_ = async () => {
  //     const _id = await localStorage.getItem('userid');
  //     console.log("**************--------", _id)
  //     history.push(`/account/${_id}`)
  //   }
  //   login_();
  //   setEmailUs(emailSelector)
  //   setUserRole(userRoleSelector)
  // }, [emailSelector, userRoleSelector])

  console.log("Sdls", emailSelector)
  console.log("handle this ", values.email)
  return (
    <div className={classes.root}>
      <div style={{ flex: 0.1 }}>
        <div style={{ width: 700, display: 'flex', justifyContent: 'center' }}>
        <img src='https://pacira-operations-portal-ui-staging.azurewebsites.net/static/media/pacira-logo.2f28cc6e.png'
          alt='pacira logo'
          className={classes.logo}
          />
        </div>
        <img src='https://pacira-operations-portal-ui-staging.azurewebsites.net/static/media/pacirabg.40fae6f2.png'
          alt='pacira login page'
          className={classes.image}
        />
      </div>
      <div className={classes.loginBox}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <text className={classes.signinText}>Sign in to your account</text>
          <CustomInput
            name='email'
            type='email'
            handleChange={handleChange}
            value={values.email}
            placeholder='email'
          />
          {/* <input
            name='password'
            type='password'
            onChange={handleChange}
            value={values.password}
            className={classes.inputTextField}
            placeholder='password'
          /> */}

          <CustomInput
            name='password'
            type='password'
            placeholder='password'
            value={values.password}
            handleChange={handleChange}
          />
          <button className={classes.loginButton} type='submit'>login</button>
        </form>
      </div>
    </div >
  )
}

export default Login
