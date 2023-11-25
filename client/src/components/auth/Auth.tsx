import { FC } from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { userSelector } from '../../features/loggedInUser/loggedInUser'
import { UserRole } from '../../features/loggedInUser/usersModel'

interface Props {
  allowedRoles: UserRole[]
}

const Auth: FC<Props> = ({ allowedRoles }) => {
  const user = useAppSelector(userSelector)
  const location = useLocation()

  return allowedRoles.find((role) => user?.role.includes(role)) ? (
    <Outlet />
  ) : user?.firstName ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )
}

export default Auth
