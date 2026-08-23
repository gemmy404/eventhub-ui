import type { AppResponseDto } from '../../types/api'
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../../types/auth'
import { apiClient } from './client'

export async function register(request: RegisterRequest) {
  const response = await apiClient.post<AppResponseDto<RegisterResponse>>('/auth/register', request)
  return response.data
}

export async function login(request: LoginRequest) {
  const response = await apiClient.post<AppResponseDto<LoginResponse>>('/auth/login', request)
  return response.data
}
