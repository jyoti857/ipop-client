import { Paper, Typography } from '@mui/material'
import React from 'react'
import tagSVG from '../../../assets/svg/tag-svg.svg'
import CustomSearch from '../../../components/customSearch'
import CustomImage from '../../../components/image'
import './tableTop.css'

type Props = { tableName: string, onClick?: any }
function TableTop({ tableName, onClick }: Props) {
  return (
    <Paper elevation={4} style={{ marginBottom: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', margin: 12, width: '11%', justifyContent: 'start', gap: 4 }}>
          <CustomImage
            className='class-filter'
            src={tagSVG}
            alt="Promotional Codes"
          />
          <div>
          </div>
          <Typography style={{ fontWeight: 900 }}>{tableName}</Typography>
        </div>
        <div style={{ width: '20%', alignItems: 'center', display: 'flex' }}>
          <CustomSearch name='search' placeholder='Search' type='text' value={'Search'}
            onClick={onClick}
            primaryButton='+ Add'
            secondaryButton='Sync'
          />
        </div>
      </div>
    </Paper>
  )
}
export default TableTop;