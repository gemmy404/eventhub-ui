export type UserRole = 'ADMIN' | 'ORGANIZER' | 'USER'

export interface RegisterRequest {
  email: string
  password: string
  name: string
}

export interface RegisterResponse {
  userId: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface AuthUser {
  id: string
  email: string
  name: string
  role: UserRole
}

export interface LoginResponse {
  accessToken: string
  user: AuthUser
}
