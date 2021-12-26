import React, { useEffect, useRef, useState } from 'react'
import { useFormik } from 'formik'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { loginDispatch } from './actions';
import { useStyles } from './styles'
import { useHistory } from 'react-router-dom'
import CustomInput from '../../components/input/CustomInput';
import Pages from '../header/pages';
import { sleep } from '../../utils/sleep';
import pacira_image from '../../assets/img/pacira_full.jpg'
import pacira_logo from '../../assets/img/pacira-logo.png'
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
  const reloadRef = useRef<number>(4)

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
      _id && history.push(`/app-account/${_id}`)
      setUserId(_id)
      setLoading(false)
      // history.go(0)
      // window.location.reload()
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
    <div className={classes.root} style={{ height: '90vh', overflow: 'hidden' }}>
      <div style={{ flex: 0.1 }}>
        <div style={{ width: 700, display: 'flex', justifyContent: 'center' }}>
          <img src={pacira_logo}
          // src='https://pacira-op-ui-staging.azurewebsites.net/static/media/pacira-logo.2f28cc6e.png'
          alt='pacira logo'
          className={classes.logo}
          />
        </div>
        <img src={pacira_image}
        //src='https://pacira-op-ui-staging.azurewebsites.net/static/media/pacirabg.11665d57.jpg'
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
            style={{ margin: 20 }}
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
