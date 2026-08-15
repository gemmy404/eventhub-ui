import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getMyTickets } from "../../services/api/tickets";
import type { ApiError } from "../../types/api";
import type { TicketResponseDto } from "../../types/tickets";

const pageSize = 6;

export function MyTicketsPage() {
    const [tickets, setTickets] = useState<TicketResponseDto[]>([]);
    const [pagination, setPagination] = useState<import("../../types/api").PaginationDto | undefined>();

    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState<ApiError | undefined>();
    const [isLoading, setIsLoading] = useState(true);
    const [retryCount, setRetryCount] = useState(0);

    const loadTickets = useCallback(async () => {
        setIsLoading(true);
        setError(undefined);

        try {
            const response = await getMyTickets({
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
    }, [currentPage]);

    useEffect(() => {
        void loadTickets();
    }, [loadTickets, retryCount]);

    return (
        <section className="tickets-page" aria-labelledby="tickets-title">
            <header className="page-heading">
                <p className="eyebrow">Your EventHub Tickets</p>

                <h1 id="tickets-title">All your tickets in one place.</h1>

                <p>View your purchased tickets, check their status, and manage your bookings.</p>
            </header>

            {isLoading && (
                <div className="page-state" role="status">
                    <span className="loading-indicator" />
                    Loading your tickets…
                </div>
            )}

            {!isLoading && error && (
                <div className="page-state page-state--error" role="alert">
                    <h2>We couldn’t load your tickets</h2>

                    <p>Please check your connection and try again.</p>

                    <button
                        className="button button--primary"
                        type="button"
                        onClick={() => setRetryCount((count) => count + 1)}
                    >
                        Try again
                    </button>
                </div>
            )}

            {!isLoading && !error && tickets.length === 0 && (
                <div className="page-state">
                    <h2>No tickets yet</h2>

                    <p>
                        You haven't purchased any tickets yet. Explore upcoming events and find something
                        worth showing up for.
                    </p>

                    <Link className="button button--primary" to="/events">
                        Browse Events
                    </Link>
                </div>
            )}

            {!isLoading && !error && tickets.length > 0 && (
                <>
                    <div className="ticket-grid">
                        {tickets.map((ticket) => (
                            <article className="ticket-card" key={ticket.id}>
                                <div className="ticket-card__topline">
                                    <span className={`status-badge status-badge--ticket-${ticket.status.toLocaleLowerCase()}`}>
                                        {ticket.status.replace("_", " ")}
                                    </span>

                                    <span className="ticket-card__code">{ticket.ticketCode}</span>
                                </div>

                                <h2>{ticket.eventTitle}</h2>

                                <dl className="ticket-card__details">
                                    <div>
                                        <dt>Date</dt>
                                        <dd>{ticket.eventDate}</dd>
                                    </div>

                                    <div>
                                        <dt>Quantity</dt>
                                        <dd>{ticket.quantity}</dd>
                                    </div>

                                    <div>
                                        <dt>Total</dt>
                                        <dd>{ticket.totalPrice} EGP</dd>
                                    </div>

                                    <div>
                                        <dt>Purchased</dt>
                                        <dd>{ticket.purchasedAt}</dd>
                                    </div>
                                </dl>

                                <Link className="ticket-card__link" to={`/my-tickets/${ticket.id}`}>
                                    View Ticket <span aria-hidden="true">→</span>
                                </Link>
                            </article>
                        ))}
                    </div>

                    {pagination && (
                        <nav className="pagination" aria-label="Tickets pagination">
                            <button
                                type="button"
                                className="button button--secondary"
                                disabled={!pagination.hasPrevPage}
                                onClick={() => setCurrentPage((page) => page - 1)}
                            >
                                Previous
                            </button>

                            <span>
                                Page {pagination.currentPage} of {pagination.totalPages}
                            </span>

                            <button
                                type="button"
                                className="button button--primary"
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
