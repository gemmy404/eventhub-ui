export interface PurchaseTicketRequest {
    eventId: string;
    quantity: number;
}

export type TicketStatus = "pending" | "confirmed" | "checked_in" | "cancelled";

export interface TicketResponseDto {
    id: string;
    eventTitle: string;
    eventDate: string;
    ticketCode: string;
    quantity: number;
    totalPrice: number;
    status: TicketStatus;
    purchasedAt: string;
}

export interface EventTicketResponseDto {
    id: string;
    ticketCode: string;
    quantity: number;
    totalPrice: number;
    status: TicketStatus;
    purchasedAt: string;
    ticketOwnerEmail: string;
    ticketOwnerName: string;
}
