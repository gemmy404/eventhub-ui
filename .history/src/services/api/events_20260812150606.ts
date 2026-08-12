import { apiClient } from './client'
import type { AppResponseDto, EventResponseDto } from '../../types/api'

export interface GetEventsParams {
  page?: number
  size?: number
}

export async function getEvents({ page = 1, size = 10 }: GetEventsParams = {}) {
  const response = await apiClient.get<AppResponseDto<EventResponseDto[]>>('/events', {
    params: { page, size },
  })

  return response.data
}

export async function getEventById(eventId: string) {
  const response = await apiClient.get<AppResponseDto<EventResponseDto>>(`/events/${eventId}`)

  return response.data
}
