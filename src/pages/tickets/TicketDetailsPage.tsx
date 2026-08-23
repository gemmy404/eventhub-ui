import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getTicketById } from "../../services/api/tickets";
import type { TicketResponseDto } from "../../types/tickets";
import type { ApiError } from "../../types/api";

import CancelTicketButton from "../../components/tickets/CancelTicketButton";

export function TicketDetailsPage() {
    const { ticketId } = useParams();

    const [ticket, setTicket] = useState<TicketResponseDto>();
    const [error, setError] = useState<ApiError>();
    const [isLoading, setIsLoading] = useState(true);
    const [retryCount, setRetryCount] = useState(0);

    useEffect(() => {
        let isCurrent = true;

        if (!ticketId) {
            setIsLoading(false);
            return;
        }

        async function loadTicket(id: string) {
            setIsLoading(true);
            setError(undefined);

            try {
                const response = await getTicketById(id);

                if (isCurrent) {
                    setTicket(response.data);
                }
            } catch (requestError: unknown) {
                if (isCurrent) {
                    setError(requestError as ApiError);
                }
            } finally {
                if (isCurrent) {
                    setIsLoading(false);
                }
            }
        }

        void loadTicket(ticketId);

        return () => {
            isCurrent = false;
        };
    }, [ticketId, retryCount]);

    if (isLoading) {
        return (
            <div className="page-state" role="status">
                <span className="loading-indicator" />
                Loading ticket…
            </div>
        );
    }

    if (error || !ticket) {
        return (
            <section className="page-state page-state--error" aria-labelledby="ticket-state-title">
                <h1 id="ticket-state-title">
                    {error?.status === 404 || !ticket ? "Ticket not found" : "We couldn’t load this ticket"}
                </h1>

                <p>
                    {error?.status === 404 || !ticket
                        ? "This ticket may no longer be available."
                        : "Please try again or return to your tickets."}
                </p>

                {error && error.status !== 404 && (
                    <button
                        className="button button--primary"
                        type="button"
                        onClick={() => setRetryCount((count) => count + 1)}
                    >
                        Try again
                    </button>
                )}

                <Link className="text-link" to="/my-tickets">
                    My Tickets
                </Link>
            </section>
        );
    }

    return (
        <article className="ticket-details" aria-labelledby="ticket-title">
            <Link className="back-link" to="/my-tickets">
                ← My Tickets
            </Link>

            <div className="ticket-details__surface">
                <div className="ticket-details__heading">
                    <span
                        className={`status-badge status-badge--ticket-${ticket.status.toLocaleLowerCase()}`}
                    >
                        {ticket.status.replace("_", " ")}
                    </span>

                    <h1 id="ticket-title">{ticket.eventTitle}</h1>
                </div>

                <p className="ticket-details__subtitle">Your EventHub ticket details.</p>

                <dl className="ticket-details__list">
                    <div>
                        <dt>Event Date</dt>
                        <dd>{ticket.eventDate}</dd>
                    </div>

                    <div>
                        <dt>Ticket Code</dt>
                        <dd className="ticket-details__code">{ticket.ticketCode}</dd>
                    </div>

                    <div>
                        <dt>Quantity</dt>
                        <dd>{ticket.quantity}</dd>
                    </div>

                    <div>
                        <dt>Total Price</dt>
                        <dd>{ticket.totalPrice} EGP</dd>
                    </div>

                    <div>
                        <dt>Status</dt>
                        <dd>{ticket.status.replace("_", " ")}</dd>
                    </div>

                    <div>
                        <dt>Purchased At</dt>
                        <dd>{ticket.purchasedAt}</dd>
                    </div>
                </dl>

                {ticket.status.toLowerCase() !== "cancelled" && (
                    <div className="ticket-details__actions">
                        <CancelTicketButton
                            ticketId={ticket.id}
                            onCancelled={() => {
                                setTicket((current) =>
                                    current
                                        ? {
                                              ...current,
                                              status: "cancelled",
                                          }
                                        : current,
                                );
                            }}
                        />
                    </div>
                )}
            </div>
        </article>
    );
}
