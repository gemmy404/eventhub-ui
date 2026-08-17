import { useEffect, useState } from "react";

import { EventCard } from "../../components/events/EventCard";
import { getMyEvents } from "../../services/api/events";
import type { ApiError, EventResponseDto, PaginationDto } from "../../types/api";

const pageSize = 6;

export function MyEventsPage() {
    const [events, setEvents] = useState<EventResponseDto[]>([]);
    const [pagination, setPagination] = useState<PaginationDto>();
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState<ApiError>();
    const [isLoading, setIsLoading] = useState(true);
    const [retryCount, setRetryCount] = useState(0);

    useEffect(() => {
        let isCurrent = true;

        async function loadMyEvents() {
            setIsLoading(true);
            setError(undefined);

            try {
                const response = await getMyEvents({
                    page: currentPage,
                    size: pageSize,
                });

                if (!isCurrent) return;

                setEvents(response.data);
                setPagination(response.pagination);
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

        void loadMyEvents();

        return () => {
            isCurrent = false;
        };
    }, [currentPage, retryCount]);

    return (
        <section className="events-page" aria-labelledby="my-events-title">
            <header className="page-heading">
                <p className="eyebrow">Organizer Dashboard</p>

                <h1 id="my-events-title">Manage your events.</h1>

                <p>View and manage the events you have created on EventHub.</p>
            </header>

            {isLoading && (
                <div className="page-state" role="status">
                    <span className="loading-indicator" />
                    Loading your events…
                </div>
            )}

            {!isLoading && error && (
                <div className="page-state page-state--error" role="alert">
                    <h2>We couldn’t load your events</h2>

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

            {!isLoading && !error && events.length === 0 && (
                <div className="page-state">
                    <h2>No events yet</h2>

                    <p>You haven't created any events yet.</p>
                </div>
            )}

            {!isLoading && !error && events.length > 0 && (
                <>
                    <div className="event-grid">
                        {events.map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>

                    {pagination && (
                        <nav className="pagination" aria-label="My events pagination">
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
