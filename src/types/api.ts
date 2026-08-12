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

export type EventStatus = 'DRAFT' | 'PUBLISHED' | 'CANCELLED'

export interface EventResponseDto {
  id: string
  title: string
  description: string | null
  date: string
  location: string
  capacity: number
  price: number
  status: EventStatus
  organizerName?: string
}

export interface ApiError {
  message: string
  status?: number
  validationErrors?: unknown[]
}
