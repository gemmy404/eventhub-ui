import { useEffect, useState } from 'react'

import { EventCard } from '../components/events/EventCard'
import { getEvents } from '../services/api/events'
import type { ApiError, EventResponseDto, PaginationDto } from '../types/api'

const pageSize = 10

export function EventsPage() {
  const [events, setEvents] = useState<EventResponseDto[]>([])
  const [pagination, setPagination] = useState<PaginationDto | undefined>()
  const [currentPage, setCurrentPage] = useState(1)
  const [error, setError] = useState<ApiError | undefined>()
  const [isLoading, setIsLoading] = useState(true)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    let isCurrent = true

    async function loadEvents() {
      setIsLoading(true)
      setError(undefined)

      try {
        const response = await getEvents({ page: currentPage, size: pageSize })
        if (!isCurrent) return
        setEvents(response.data)
        setPagination(response.pagination)
      } catch (requestError: unknown) {
        if (isCurrent) {
          setError(requestError as ApiError)
        }
      } finally {
        if (isCurrent) setIsLoading(false)
      }
    }

    void loadEvents()
    return () => { isCurrent = false }
  }, [currentPage, retryCount])

  return (
    <section className="events-page" aria-labelledby="events-title">
      <header className="page-heading">
        <p className="eyebrow">Explore EventHub</p>
        <h1 id="events-title">Browse events worth showing up for.</h1>
        <p>Find upcoming experiences from organizers in one simple place.</p>
      </header>

      {isLoading && <div className="page-state" role="status"><span className="loading-indicator" /> Loading events…</div>}
      {!isLoading && error && (
        <div className="page-state page-state--error" role="alert">
          <h2>We couldn’t load events</h2><p>Please check your connection and try again.</p>
          <button className="button button--primary" type="button" onClick={() => setRetryCount((count) => count + 1)}>Try again</button>
        </div>
      )}
      {!isLoading && !error && events.length === 0 && (
        <div className="page-state"><h2>No events available</h2><p>Check back soon for upcoming EventHub experiences.</p></div>
      )}
      {!isLoading && !error && events.length > 0 && (
        <>
          <div className="event-grid">{events.map((event) => <EventCard key={event.id} event={event} />)}</div>
          {pagination && (
            <nav className="pagination" aria-label="Events pagination">
              <button type="button" className="button button--secondary" disabled={!pagination.hasPrevPage} onClick={() => setCurrentPage((page) => page - 1)}>Previous</button>
              <span>Page {pagination.currentPage} of {pagination.totalPages}</span>
              <button type="button" className="button button--primary" disabled={!pagination.hasNextPage} onClick={() => setCurrentPage((page) => page + 1)}>Next</button>
            </nav>
          )}
        </>
      )}
    </section>
  )
}
