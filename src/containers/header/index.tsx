import { Divider, Icon, IconButton } from '@mui/material'
import React, { ReactElement, useState } from 'react'
import { useStyles } from './styles'
// import BubbleChartOutlinedIcon from '@mui/icons-material/BubbleChartOutlined';
import { FaHospitalUser, FaChartPie } from 'react-icons/fa';
import ConfIcon from '../../assets/svg/conf.svg';
import CustomAvatar from '../../components/avatar';
import CustomCard from '../../components/card';
import CustomModal from '../../components/modal';
import CustomInput from '../../components/input/CustomInput';
interface Props {
  children: any
}

function Header({ children }: Props): ReactElement {
  const [cardOpen, setCardOpen] = useState(false);
  const handleCardOpen = () => setCardOpen(!cardOpen);

  const classes = useStyles()
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <img src='https://pacira-operations-portal-ui-staging.azurewebsites.net/static/media/pacira-logo.2f28cc6e.png'
          alt='pacira logo'
          className={classes.logo}
        />
        <div style={{ textAlign: 'center', margin: 10, marginRight: 20, width: 180, display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          <FaChartPie className={classes.icons} />
          <FaHospitalUser className={classes.icons} />
          <CustomAvatar alt="Remy Sharp" src="https://reqres.in/img/faces/5-image.jpg" onClick={handleCardOpen} />
          {
            cardOpen ? <CustomCard setCardOpen={setCardOpen} /> : null
          }
        </div>
      </div>
      <Divider style={{ borderWidth: 1, backgroundColor: '#C54BC4' }} />
      {children}
    </div>
  )
}

export default Header
