export interface User {
  firstName: string
  lastName: string
  email: string
  password?: string
  _id: string
  role: UserRole
}

export enum UserRole {
  ADMIN = 'admin',
  COSTUMER = 'costumer',
}
