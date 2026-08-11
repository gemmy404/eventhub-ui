import axios, { type AxiosError } from 'axios'

import { env } from '../../config/env'
import type { ApiError, AppResponseDto } from '../../types/api'

export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  headers: {
    Accept: 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  // Attach authorization headers here once authentication is implemented.
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<AppResponseDto<unknown>>) => {
    const apiError: ApiError = {
      message: error.response?.data.message ?? error.message ?? 'An unexpected error occurred.',
      status: error.response?.status,
      validationErrors: error.response?.data.validationErrors,
    }

    return Promise.reject(apiError)
  },
)
