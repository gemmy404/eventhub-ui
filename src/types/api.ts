export interface AppResponseDto<T> {
  status: string
  data: T
  message?: string
  validationErrors?: unknown[]
  pagination?: PaginationDto
}

export interface PaginationDto {
  totalElements: number
  totalPages: number
  currentPage: number
  size: number
  hasNextPage: boolean
  hasPrevPage: boolean
}
export interface ApiError {
  message: string
  status?: number
  validationErrors?: unknown[]
}
