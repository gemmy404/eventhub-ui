import { type FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { getEventById, updateEvent } from "../../services/api/events";
import type { ApiError } from "../../types/api";
import type { EventResponseDto } from "../../types/events";

function toDateTimeLocal(value: string): string {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "";
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function EditEventPage() {
    const { eventId } = useParams();
    const navigate = useNavigate();

    const [event, setEvent] = useState<EventResponseDto>();
    const [error, setError] = useState<ApiError>();
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [form, setForm] = useState({
        title: "",
        description: "",
        date: "",
        location: "",
        capacity: "",
        price: "",
    });

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

                if (!isCurrent) return;

                const currentEvent = response.data;

                setEvent(currentEvent);

                setForm({
                    title: currentEvent.title,
                    description: currentEvent.description ?? "",
                    date: toDateTimeLocal(currentEvent.date),
                    location: currentEvent.location,
                    capacity: String(currentEvent.capacity),
                    price: String(currentEvent.price),
                });
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
    }, [eventId]);

    function updateField(field: keyof typeof form, value: string) {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));
    }

    async function handleSubmit(submitEvent: FormEvent<HTMLFormElement>) {
        submitEvent.preventDefault();

        if (!eventId) return;

        setError(undefined);
        setIsSubmitting(true);

        try {
            await updateEvent(eventId, {
                title: form.title.trim(),
                description: form.description.trim() || undefined,
                date: form.date,
                location: form.location.trim(),
                capacity: Number(form.capacity),
                price: Number(form.price),
            });

            navigate(`/my-events/${eventId}`);
        } catch (requestError: unknown) {
            setError(requestError as ApiError);
        } finally {
            setIsSubmitting(false);
        }
    }

    if (isLoading) {
        return (
            <div className="page-state" role="status">
                <span className="loading-indicator" />
                Loading event…
            </div>
        );
    }

    if (error || !event) {
        return (
            <section className="page-state page-state--error" aria-labelledby="edit-event-state-title">
                <h1 id="edit-event-state-title">
                    {error?.status === 404 || !event ? "Event not found" : "We couldn’t load this event"}
                </h1>

                <p>
                    {error?.status === 404 || !event
                        ? "This event may no longer be available."
                        : "Please try again or return to your event."}
                </p>

                <Link className="text-link" to="/my-events">
                    My Events
                </Link>
            </section>
        );
    }

    return (
        <section className="form-page" aria-labelledby="edit-event-title">
            <header className="page-heading">
                <p className="eyebrow">Organizer Dashboard</p>

                <h1 id="edit-event-title">Edit your event.</h1>

                <p>Update the details of your EventHub event.</p>
            </header>

            <form className="event-form" onSubmit={handleSubmit}>
                {error && (
                    <div className="page-state page-state--error" role="alert">
                        <h2>We couldn’t update the event</h2>
                        <p>{error.message}</p>
                    </div>
                )}

                <div className="form-field">
                    <label htmlFor="title">Title</label>

                    <input
                        id="title"
                        value={form.title}
                        onChange={(e) => updateField("title", e.target.value)}
                        maxLength={255}
                        required
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="description">Description</label>

                    <textarea
                        id="description"
                        value={form.description}
                        onChange={(e) => updateField("description", e.target.value)}
                    />
                </div>

                <div className="form-grid">
                    <div className="form-field">
                        <label htmlFor="date">Date & time</label>

                        <input
                            id="date"
                            type="datetime-local"
                            value={form.date}
                            onChange={(e) => updateField("date", e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="location">Location</label>

                        <input
                            id="location"
                            value={form.location}
                            onChange={(e) => updateField("location", e.target.value)}
                            maxLength={255}
                            required
                        />
                    </div>
                </div>

                <div className="form-grid">
                    <div className="form-field">
                        <label htmlFor="capacity">Capacity</label>

                        <input
                            id="capacity"
                            type="number"
                            min="1"
                            value={form.capacity}
                            onChange={(e) => updateField("capacity", e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="price">Price</label>

                        <input
                            id="price"
                            type="number"
                            min="0"
                            value={form.price}
                            onChange={(e) => updateField("price", e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="form-actions">
                    <Link className="button button--secondary" to={`/my-events/${eventId}`}>
                        Cancel
                    </Link>

                    <button className="button button--primary" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Saving…" : "Save Changes"}
                    </button>
                </div>
            </form>
        </section>
    );
}
