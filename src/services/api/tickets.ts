import type { AppResponseDto } from '../../types/api'
import type { PurchaseTicketRequest, TicketResponseDto } from '../../types/tickets'
import { apiClient } from './client'

export async function purchaseTicket(request: PurchaseTicketRequest): Promise<AppResponseDto<TicketResponseDto>> {
  const response = await apiClient.post<AppResponseDto<TicketResponseDto>>('/tickets/purchase-ticket', request)
  return response.data
}
