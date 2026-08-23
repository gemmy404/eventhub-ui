import axios, { type AxiosError } from 'axios'

import { env } from '../../config/env'
import type { ApiError, AppResponseDto } from '../../types/api'
import { getAccessToken } from '../../utils/authStorage'

export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  headers: {
    Accept: 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  const accessToken = getAccessToken()
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<AppResponseDto<unknown>>) => {
    if (error.response?.status === 401) {
      window.dispatchEvent(new Event('auth:unauthorized'))
    }
    
    const apiError: ApiError = {
      message: error.response?.data.message ?? error.message ?? 'An unexpected error occurred.',
      status: error.response?.status,
      validationErrors: error.response?.data.validationErrors,
    }

    return Promise.reject(apiError)
  },
)
