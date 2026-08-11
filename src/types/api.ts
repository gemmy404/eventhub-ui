export interface AppResponseDto<T> {
  status: string
  data: T
  message?: string
  validationErrors?: unknown[]
  pagination?: unknown
}

export interface ApiError {
  message: string
  status?: number
  validationErrors?: unknown[]
}
