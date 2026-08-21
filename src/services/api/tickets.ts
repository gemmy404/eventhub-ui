import type { AppResponseDto } from "../../types/api";
import type {
    PurchaseTicketRequest,
    TicketResponseDto,
    EventTicketResponseDto,
    CheckedInTicketRequest,
} from "../../types/tickets";
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

export async function getEventTickets(
    eventId: string,
    { page = 1, size = 6 }: GetTicketsParams = {},
): Promise<AppResponseDto<EventTicketResponseDto[]>> {
    const response = await apiClient.get<AppResponseDto<EventTicketResponseDto[]>>(
        `/tickets/events/${eventId}`,
        {
            params: {
                page,
                size,
            },
        },
    );

    return response.data;
}

export async function checkInTicket(request: CheckedInTicketRequest): Promise<AppResponseDto<null>> {
    const response = await apiClient.patch<AppResponseDto<null>>("/tickets/check-in-ticket", request);

    return response.data;
}
