import { Divider } from '@mui/material'
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
interface Props {
  children?: React.ReactElement
}

function Header({ children }: Props): ReactElement {
  const [cardOpen, setCardOpen] = useState(false);
  const handleCardOpen = () => setCardOpen(!cardOpen);
  const [pageName, setPageName] = useState('Account')
  const [loggedUser, setLoggedUser] = useState('')
  const [userId, setUserId] = useState(localStorage.getItem('userid')!)
  const userIdRef = useRef<string>('')
  userIdRef.current = localStorage.getItem('userid')!
  const history = useHistory();
  const handleConfiguration = () => {
    history.push('/portal-configuration')
  }
  const handleAccountList = () => {
    history.push(`/app-account/${userId}`)
  }
  // const handleConfiguration = () => {
    //   history.push('/portal-configuration')
    // }

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
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <img src={logo}
        // src='https://pacira-op-ui-staging.azurewebsites.net/static/media/pacira-logo.2f28cc6e.png'
          alt='pacira logo'
          className={classes.logo}
        />
        <div style={{ textAlign: 'center', margin: 10, marginRight: 20, width: 180, display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          <FaChartPie className={classes.icons} onClick={() => handlePageName('Dashboard')} />
          <FaHospitalUser className={classes.icons}
            // onClick={() => handlePageName('Account')} 
            onClick={handleAccountList}
          />
          <FaCogs className={classes.icons}
            // onClick={() => handlePageName('Configuration')}
            onClick={handleConfiguration}
          />
          <CustomAvatar alt="Remy Sharp" src="https://reqres.in/img/faces/5-image.jpg" onClick={handleCardOpen} />
          {
            cardOpen ? <CustomCard loggedUser={loggedUser} setCardOpen={setCardOpen} /> : null
          }
        </div>
      </div>
      <Divider style={{ borderWidth: 1, backgroundColor: '#C54BC4' }} />
      {/* <Pages pageName={pageName} /> */}
      {/* {switchPages(pageName)} */}
      {/* {children} */}
    </div>
  )
}

export default Header
