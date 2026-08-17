export type EventStatus = "DRAFT" | "PUBLISHED" | "CANCELLED";

export interface EventResponseDto {
    id: string;
    title: string;
    description: string | null;
    date: string;
    location: string;
    capacity: number;
    price: number;
    status: EventStatus;
    organizerName?: string;
}

export interface CreateEventRequestDto {
    title: string;
    description?: string;
    date: string;
    location: string;
    capacity: number;
    price: number;
    status: EventStatus;
}
