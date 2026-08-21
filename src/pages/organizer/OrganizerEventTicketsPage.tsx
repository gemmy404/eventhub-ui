import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getEventTickets } from "../../services/api/tickets";
import type { ApiError, PaginationDto } from "../../types/api";
import type { EventTicketResponseDto } from "../../types/tickets";
import { CheckInTicketButton } from "../../components/tickets/CheckInTicketButton";

const pageSize = 6;

export function OrganizerEventTicketsPage() {
    const { eventId } = useParams();

    const [tickets, setTickets] = useState<EventTicketResponseDto[]>([]);
    const [pagination, setPagination] = useState<PaginationDto>();
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState<ApiError>();
    const [isLoading, setIsLoading] = useState(true);
    const [retryCount, setRetryCount] = useState(0);

    const loadTickets = useCallback(async () => {
        if (!eventId) {
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setError(undefined);

        try {
            const response = await getEventTickets(eventId, {
                page: currentPage,
                size: pageSize,
            });

            setTickets(response.data);
            setPagination(response.pagination);
        } catch (requestError: unknown) {
            setError(requestError as ApiError);
        } finally {
            setIsLoading(false);
        }
    }, [eventId, currentPage]);

    useEffect(() => {
        void loadTickets();
    }, [loadTickets, retryCount]);

    if (isLoading) {
        return (
            <div className="page-state" role="status">
                <span className="loading-indicator" />
                Loading event tickets…
            </div>
        );
    }

    if (error) {
        return (
            <section className="page-state page-state--error" role="alert">
                <h1>We couldn’t load the event tickets</h1>

                <p>{error.message ?? "Please check your connection and try again."}</p>

                <button
                    className="button button--primary"
                    type="button"
                    onClick={() => setRetryCount((count) => count + 1)}
                >
                    Try again
                </button>

                <Link className="text-link" to={`/my-events/${eventId}`}>
                    Back to Event
                </Link>
            </section>
        );
    }

    return (
        <section className="organizer-tickets-page" aria-labelledby="event-tickets-title">
            <Link className="back-link" to={`/my-events/${eventId}`}>
                ← Event Details
            </Link>

            <header className="page-heading">
                <p className="eyebrow">Organizer Dashboard</p>

                <h1 id="event-tickets-title">Event Tickets</h1>

                <p>View tickets purchased for this event and check them in at the entrance.</p>
            </header>

            {tickets.length === 0 ? (
                <div className="page-state">
                    <h2>No tickets yet</h2>

                    <p>No tickets have been purchased for this event yet.</p>
                </div>
            ) : (
                <>
                    <div className="event-tickets-table-wrapper">
                        <table className="event-tickets-table">
                            <thead>
                                <tr>
                                    <th>Ticket Code</th>
                                    <th>Attendee</th>
                                    <th>Email</th>
                                    <th>Qty</th>
                                    <th>Total</th>
                                    <th>Purchased At</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {tickets.map((ticket) => (
                                    <tr key={ticket.id}>
                                        <td>
                                            <span className="event-tickets-table__code">
                                                {ticket.ticketCode}
                                            </span>
                                        </td>

                                        <td className="event-tickets-table__attendee">
                                            {ticket.ticketOwnerName}
                                        </td>

                                        <td>{ticket.ticketOwnerEmail}</td>

                                        <td>{ticket.quantity}</td>

                                        <td>{ticket.totalPrice} EGP</td>

                                        <td>{ticket.purchasedAt}</td>

                                        <td>
                                            <span
                                                className={`status-badge status-badge--ticket-${ticket.status}`}
                                            >
                                                {ticket.status.replace("_", " ")}
                                            </span>
                                        </td>

                                        <td>
                                            {ticket.status.toLowerCase() === "confirmed" ? (
                                                <CheckInTicketButton
                                                    ticketCode={ticket.ticketCode}
                                                    onCheckedIn={() => {
                                                        setTickets((currentTickets) =>
                                                            currentTickets.map((currentTicket) =>
                                                                currentTicket.id === ticket.id
                                                                    ? {
                                                                          ...currentTicket,
                                                                          status: "checked_in",
                                                                      }
                                                                    : currentTicket,
                                                            ),
                                                        );
                                                    }}
                                                />
                                            ) : (
                                                <span className="event-tickets-table__no-action">—</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {pagination && pagination.totalPages > 1 && (
                        <nav className="pagination" aria-label="Event tickets pagination">
                            <button
                                className="button button--secondary"
                                type="button"
                                disabled={!pagination.hasPrevPage}
                                onClick={() => setCurrentPage((page) => page - 1)}
                            >
                                Previous
                            </button>

                            <span>
                                Page {pagination.currentPage} of {pagination.totalPages}
                            </span>

                            <button
                                className="button button--primary"
                                type="button"
                                disabled={!pagination.hasNextPage}
                                onClick={() => setCurrentPage((page) => page + 1)}
                            >
                                Next
                            </button>
                        </nav>
                    )}
                </>
            )}
        </section>
    );
}
