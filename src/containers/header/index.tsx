import { Divider, Paper } from '@mui/material'
import { ReactElement, useEffect, useRef, useState } from 'react'
import { useStyles } from './styles'
import { FaHospitalUser, FaChartPie } from 'react-icons/fa';
import CustomAvatar from '../../components/avatar';
import CustomCard from '../../components/card';
import { FaCogs } from 'react-icons/fa'
import Pages from './pages';
import { Dashboard } from '@mui/icons-material';
import AccountList from '../account/AccountList';
import Configuration from '../configuration';
import { useHistory, useParams } from 'react-router-dom';
// import logo from 'assets/img/pacira-logo.png'
import logo from '../../assets/img/pacira-logo.png'
import clsx from 'clsx'
interface Props {
  children?: React.ReactElement
}

function Header({ children }: Props): ReactElement {
  const [cardOpen, setCardOpen] = useState(false);
  const handleCardOpen = () => setCardOpen(!cardOpen);
  const [pageName, setPageName] = useState('Account')
  const [headerIconActive, setHeaderIconActive] = useState(pageName)
  const [loggedUser, setLoggedUser] = useState('')
  const [userId, setUserId] = useState<string>()
  const params = useParams<{ userId: string }>();
  const userIdRef = useRef<string>('')
  userIdRef.current = params.userId;
  const history = useHistory();
  const handleConfiguration = () => {
    handleHeaderIconClick("Configuration")
    history.push('/portal-configuration')
  }
  const handleAccountList = () => {
    handleHeaderIconClick("Account")
    console.log("handle account list userid ref ---> ", userId, userIdRef.current, localStorage.getItem('userid'))
    return history.push(`/app-account/${localStorage.getItem('userid')}`)
  }
  const handleDashboard = () => {
    handleHeaderIconClick("Dashboard")
    return history.push(`/app-user/${localStorage.getItem('userid')}`)
  }
  // const handleConfiguration = () => {
    //   history.push('/portal-configuration')
    // }

  const handleHeaderIconClick = (iconName: string) => {
    setHeaderIconActive(iconName)
  }
  const handlePageName = (page: string) => {
    setPageName(page)
  }
  useEffect(() => {
    const userId = localStorage.getItem('userid')!
    setUserId(userId)
    setLoggedUser(localStorage.getItem('username')!)
  }, [localStorage.getItem('username'), userId])
  const classes = useStyles()
  return (
    <Paper className={classes.hederBorder}
      style={{ boxShadow: '0px 5px 15px 0px #000000', margin: 6, padding: 6, width: '99%', height: 71, display: 'flex', justifyContent: "space-between", alignItems: 'center' }}>
      {/* <div style={{ display: 'flex', justifyContent: 'space-between' }}> */}
        <img src={logo}
          alt='pacira logo'
          className={classes.logo}
        />
      <div style={{ textAlign: 'center', margin: 10, marginRight: 20, width: 200, display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          <FaChartPie className={clsx(classes.icons, headerIconActive === 'Dashboard' && classes.active)}
            //  onClick={() => handlePageName('Dashboard')} 
            onClick={handleDashboard}
          />
          <FaHospitalUser className={clsx(classes.icons, headerIconActive === 'Account' && classes.active)}
            // onClick={() => handlePageName('Account')} 
            onClick={handleAccountList}
          />
          <FaCogs className={clsx(classes.icons, headerIconActive === 'Configuration' && classes.active)}
            // onClick={() => handlePageName('Configuration')}
            onClick={handleConfiguration}
          />
          <CustomAvatar alt="Remy Sharp" src="https://reqres.in/img/faces/5-image.jpg" onClick={handleCardOpen} />
          {
            cardOpen ? <CustomCard loggedUser={loggedUser} setCardOpen={setCardOpen} /> : null
          }
        </div>
      {/* </div> */}
      {/* <Pages pageName={pageName} /> */}
      {/* {switchPages(pageName)} */}
      {/* {children} */}
    </Paper>
  )
}

export default Header
