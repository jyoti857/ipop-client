import React, { ReactElement } from 'react'
import { forEachChild } from 'typescript';
import CustomizedTables from '../../components/table'
import { useUsersHook } from './users/useUsersHook'
import Check from '../../assets/svg/tick-svg.svg'
import TableTop from './common/tableTop';
function createData(
  username: string,
  firstName: string,
  lastName: string,
  email: string,
  gender: number,
  role: string,
  isAdmin: any
) {
  return { username, firstName, lastName, email, gender, role, isAdmin };
}
// const a =
function Users(): ReactElement {
  const { users } = useUsersHook()
  let rows: any = []
  users?.forEach(({ username, firstName, lastName, email, role, gender, isAdmin }: any) => {
      rows.push(createData(username, firstName, lastName, email, gender, role, isAdmin,))
    })

  return (
    <div>
      <TableTop tableName='Users' />
      <CustomizedTables
        headers={["User Name", 'First Name', 'Last Name', "Email", "Gender", "Role", "Is Admin"]}
        rows={rows}
        isCloseIcon={true}
        isFooter={false}
      />
    </div>
  )
}

export default Users
