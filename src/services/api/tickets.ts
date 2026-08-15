import type { AppResponseDto } from "../../types/api";
import type { PurchaseTicketRequest, TicketResponseDto } from "../../types/tickets";
import { apiClient } from "./client";

export interface GetTicketsParams {
    page?: number;
    size?: number;
}

export async function purchaseTicket(
    request: PurchaseTicketRequest,
): Promise<AppResponseDto<TicketResponseDto>> {
    const response = await apiClient.post<AppResponseDto<TicketResponseDto>>(
        "/tickets/purchase-ticket",
        request,
    );
    return response.data;
}

export async function getMyTickets({ page = 1, size = 10 }: GetTicketsParams = {}): Promise<
    AppResponseDto<TicketResponseDto[]>
> {
    const response = await apiClient.get<AppResponseDto<TicketResponseDto[]>>("/tickets/me", {
        params: { page, size },
    });

    return response.data;
}

export async function getTicketById(ticketId: string): Promise<AppResponseDto<TicketResponseDto>> {
    const response = await apiClient.get<AppResponseDto<TicketResponseDto>>(`/tickets/${ticketId}`);

    return response.data;
}

export async function cancelTicket(ticketId: string): Promise<AppResponseDto<null>> {
    const response = await apiClient.patch<AppResponseDto<null>>(`/tickets/${ticketId}/cancel-ticket`);

    return response.data;
}
