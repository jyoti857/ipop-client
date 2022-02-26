import React, { useState } from 'react'

type Props<T> = {
  [K in keyof T]: T[K]
}

function useInputForm<T>(a: Props<T>): [T, any] {
  const [inputForm, setInputForm] = useState<T>({ ...a })
  const handleInputChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handle input ** ---> ", inputForm)
    setInputForm({
      ...inputForm,
      [e.target.name]: e.target.value,
    })
  }
  return [inputForm, handleInputChangeForm]
}

export default useInputForm