import { Link } from "react-router-dom";

import type { EventResponseDto } from "../../types/events";
import { formatEventDate, formatEventPrice } from "../../utils/formatters";

interface EventCardProps {
    event: EventResponseDto;
    detailsPath?: string;
}

export function EventCard({ event, detailsPath }: EventCardProps) {
    return (
        <article className="event-card">
            <div className="event-card__topline">
                <span className={`status-badge status-badge--${event.status.toLowerCase()}`}>
                    {event.status}
                </span>
                {event.organizerName && (
                    <span className="event-card__organizer">By {event.organizerName}</span>
                )}
            </div>
            <h2>{event.title}</h2>
            {event.description && <p className="event-card__description">{event.description}</p>}
            <dl className="event-card__details">
                <div>
                    <dt>Date</dt>
                    <dd>{formatEventDate(event.date)}</dd>
                </div>
                <div>
                    <dt>Location</dt>
                    <dd>{event.location}</dd>
                </div>
                <div>
                    <dt>Price</dt>
                    <dd>{formatEventPrice(event.price)}</dd>
                </div>
            </dl>
            <Link className="event-card__link" to={detailsPath ?? `/events/${event.id}`}>
                View Event <span aria-hidden="true">→</span>
            </Link>
        </article>
    );
}
