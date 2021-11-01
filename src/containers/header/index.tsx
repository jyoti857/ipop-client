import { Divider } from '@mui/material'
import { ReactElement, useState } from 'react'
import { useStyles } from './styles'
import { FaHospitalUser, FaChartPie } from 'react-icons/fa';
import CustomAvatar from '../../components/avatar';
import CustomCard from '../../components/card';
import { FaCogs } from 'react-icons/fa'
import Pages from './pages';
interface Props {
  children?: React.ReactElement
}

function Header({ children }: Props): ReactElement {
  const [cardOpen, setCardOpen] = useState(false);
  const handleCardOpen = () => setCardOpen(!cardOpen);
  const [pageName, setPageName] = useState('Dashboard')
  const handlePageName = (page: string) => {
    setPageName(page)
  }
  const classes = useStyles()
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <img src='https://pacira-operations-portal-ui-staging.azurewebsites.net/static/media/pacira-logo.2f28cc6e.png'
          alt='pacira logo'
          className={classes.logo}
        />
        <div style={{ textAlign: 'center', margin: 10, marginRight: 20, width: 180, display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          <FaChartPie className={classes.icons} onClick={() => handlePageName('Dashboard')} />
          <FaHospitalUser className={classes.icons} onClick={() => handlePageName('Account')} />
          <FaCogs className={classes.icons} onClick={() => handlePageName('Configuration')} />
          <CustomAvatar alt="Remy Sharp" src="https://reqres.in/img/faces/5-image.jpg" onClick={handleCardOpen} />
          {
            cardOpen ? <CustomCard setCardOpen={setCardOpen} /> : null
          }
        </div>
      </div>
      <Divider style={{ borderWidth: 1, backgroundColor: '#C54BC4' }} />
      <Pages pageName={pageName} />
      {/* {children} */}
    </div>
  )
}

export default Header
