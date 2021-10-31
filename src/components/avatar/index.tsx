import { Avatar } from '@mui/material'
import React, { ReactElement } from 'react'

export interface CustomAvatarType {
  alt: string;
  src: string;
  checkStatus?: { email: string; status: boolean };
  clicked?: boolean;
  onClick?: () => void;
}

function CustomAvatar({ alt, src, clicked, onClick }: CustomAvatarType): ReactElement {
  return (
    <div>
      {/* <Avatar alt="Remy Sharp" src="https://reqres.in/img/faces/5-image.jpg" /> */}
      < Avatar alt={alt} src={src} onClick={onClick} />
    </div>
  )
}

export default CustomAvatar
