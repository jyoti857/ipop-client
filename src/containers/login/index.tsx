import React from 'react'
import { useFormik } from 'formik'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { loginDispatch } from './actions';
import { useStyles } from './styles'
import CustomInput from '../../components/input/CustomInput';

interface Props {
  email: string;
  password: string;
}

const Login: React.FC<Props> = ({ email, password }) => {
  const classes = useStyles()
  const dispatch = useDispatch();
  const emailSelector = useSelector((state: any) => state.authReducers.email, shallowEqual);
  const [emailUs, setEmailUs] = React.useState<Props>();
  const { handleChange, handleBlur, handleSubmit, values, } = useFormik<Props>({
    initialValues: {
      email,
      password
    },
    onSubmit: () => loginSubmit()
  })
  const loginSubmit = () => {
    const { email, password } = values;
    dispatch(loginDispatch({ email, password }))
  }
  React.useEffect(() => {
    setEmailUs(emailSelector)
  }, [emailSelector])
  console.log("Sdls", emailSelector)
  console.log("handle this ", values.email)
  return (
    <div className={classes.root}>
      <div style={{ flex: 0.1 }}>
        <img src='https://pacira-operations-portal-ui-staging.azurewebsites.net/static/media/pacira-logo.2f28cc6e.png'
          alt='pacira logo'
          className={classes.logo}
        />
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
