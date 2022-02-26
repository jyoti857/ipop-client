import React, { useState } from 'react'
import { SelectChangeEvent } from '@mui/material/Select';

type Props<T> = {
  [K in keyof T]: T[K]
}
function useDropdown<T>(a: Props<T>): [T, any] {
  const [dropdown, setDropdown] = useState<T>({ ...a })
  const handleDropdown = (e: SelectChangeEvent) => {
    setDropdown(
      {
        ...dropdown,
        [e.target.name]: e.target.value
      }
    )
  }
  return [dropdown, handleDropdown]
}

export default useDropdown