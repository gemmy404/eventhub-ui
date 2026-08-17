import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getEventById } from "../../services/api/events";
import type { ApiError } from "../../types/api";
import type { EventResponseDto } from "../../types/events";
import { formatEventDate, formatEventPrice } from "../../utils/formatters";

export function OrganizerEventDetailsPage() {
    const { eventId } = useParams();

    const [event, setEvent] = useState<EventResponseDto>();
    const [error, setError] = useState<ApiError>();
    const [isLoading, setIsLoading] = useState(true);
    const [retryCount, setRetryCount] = useState(0);

    useEffect(() => {
        let isCurrent = true;

        if (!eventId) {
            setIsLoading(false);
            return undefined;
        }

        async function loadEvent(id: string) {
            setIsLoading(true);
            setError(undefined);

            try {
                const response = await getEventById(id);

                if (isCurrent) {
                    setEvent(response.data);
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

        void loadEvent(eventId);

        return () => {
            isCurrent = false;
        };
    }, [eventId, retryCount]);

    if (isLoading) {
        return (
            <div className="page-state" role="status">
                <span className="loading-indicator" />
                Loading event…
            </div>
        );
    }

    if (error || !event) {
        const notFound = error?.status === 404 || !event;

        return (
            <section className="page-state page-state--error" aria-labelledby="organizer-event-state-title">
                <h1 id="organizer-event-state-title">
                    {notFound ? "Event not found" : "We couldn’t load this event"}
                </h1>

                <p>
                    {notFound
                        ? "This event may no longer be available."
                        : "Please try again or return to your events."}
                </p>

                {!notFound && (
                    <button
                        className="button button--primary"
                        type="button"
                        onClick={() => setRetryCount((count) => count + 1)}
                    >
                        Try again
                    </button>
                )}

                <Link className="text-link" to="/my-events">
                    My Events
                </Link>
            </section>
        );
    }

    return (
        <article className="event-details" aria-labelledby="organizer-event-title">
            <Link className="back-link" to="/my-events">
                ← My Events
            </Link>

            <div className="event-details__surface">
                <div className="event-details__heading">
                    <span className={`status-badge status-badge--${event.status.toLowerCase()}`}>
                        {event.status}
                    </span>

                    <h1 id="organizer-event-title">{event.title}</h1>
                </div>

                {event.description && <p className="event-details__description">{event.description}</p>}

                <dl className="event-details__list">
                    <div>
                        <dt>Date & time</dt>
                        <dd>{formatEventDate(event.date)}</dd>
                    </div>

                    <div>
                        <dt>Location</dt>
                        <dd>{event.location}</dd>
                    </div>

                    <div>
                        <dt>Capacity</dt>
                        <dd>{event.capacity}</dd>
                    </div>

                    <div>
                        <dt>Price</dt>
                        <dd>{formatEventPrice(event.price)}</dd>
                    </div>

                    {event.organizerName && (
                        <div>
                            <dt>Organizer</dt>
                            <dd>{event.organizerName}</dd>
                        </div>
                    )}
                </dl>

                <div className="organizer-event-details__actions" id="event-details-actions">
                    <Link className="button button--primary" to={`/my-events/${event.id}/edit`}>
                        Edit Event
                    </Link>

                    <Link className="button button--secondary" to="/my-events">
                        Back to My Events
                    </Link>
                </div>
            </div>
        </article>
    );
}
