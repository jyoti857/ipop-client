import React, { ReactElement, useState } from 'react'
import Header from '..'
import AccountDetail from '../../account/accountDetail'
import AccountList from '../../account/AccountList'
import Configuration from '../../configuration'
import Dashboard from '../../dashboard'

interface Props {
  pageName: string;
}
const switchPages = (pageName: string) => {
  switch (pageName) {
    case "Dashboard": {
      return <Dashboard />
    }
    case "Account": {
      return <AccountList />
    }
    case "Configuration": {
      return <Configuration />
    }
    default: <Dashboard />
  }
}
function Pages({ pageName }: Props): ReactElement {
  return (
    // <Header>
    <div>
      {
        switchPages(pageName)
      }
    </div>
    // </Header>
  )
}

export default Pages
