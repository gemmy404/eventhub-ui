import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { createEvent } from "../../services/api/events";
import type { ApiError } from "../../types/api";
import type { EventStatus } from "../../types/events";

export function CreateEventPage() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        date: "",
        location: "",
        capacity: "1",
        price: "0",
        status: "DRAFT" as EventStatus,
    });

    const [error, setError] = useState<ApiError>();
    const [isSubmitting, setIsSubmitting] = useState(false);

    function updateField(field: keyof typeof form, value: string) {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setError(undefined);
        setIsSubmitting(true);

        try {
            await createEvent({
                title: form.title.trim(),
                description: form.description.trim() || undefined,
                date: form.date,
                location: form.location.trim(),
                capacity: Number(form.capacity),
                price: Number(form.price),
                status: form.status,
            });

            navigate("/my-events");
        } catch (requestError: unknown) {
            setError(requestError as ApiError);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <section className="form-page" aria-labelledby="create-event-title">
            <header className="page-heading">
                <p className="eyebrow">Organizer Dashboard</p>

                <h1 id="create-event-title">Create a new event.</h1>

                <p>Add an event and make it available on EventHub.</p>
            </header>

            <form className="event-form" onSubmit={handleSubmit}>
                {error && (
                    <div className="page-state page-state--error" role="alert">
                        <h2>We couldn’t create the event</h2>

                        <p>{error.message ?? "Please check your information and try again."}</p>
                    </div>
                )}

                <div className="form-field">
                    <label htmlFor="title">Title</label>

                    <input
                        id="title"
                        value={form.title}
                        onChange={(event) => updateField("title", event.target.value)}
                        required
                        maxLength={255}
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="description">Description</label>

                    <textarea
                        id="description"
                        value={form.description}
                        onChange={(event) => updateField("description", event.target.value)}
                    />
                </div>

                <div className="form-grid">
                    <div className="form-field">
                        <label htmlFor="date">Date & time</label>

                        <input
                            id="date"
                            type="datetime-local"
                            value={form.date}
                            onChange={(event) => updateField("date", event.target.value)}
                            required
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="location">Location</label>

                        <input
                            id="location"
                            value={form.location}
                            onChange={(event) => updateField("location", event.target.value)}
                            required
                            maxLength={255}
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
                            onChange={(event) => updateField("capacity", event.target.value)}
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
                            onChange={(event) => updateField("price", event.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="form-field">
                    <label htmlFor="status">Status</label>

                    <select
                        id="status"
                        value={form.status}
                        onChange={(event) => updateField("status", event.target.value)}
                    >
                        <option value="DRAFT">Draft</option>
                        <option value="PUBLISHED">Published</option>
                        <option value="CANCELLED">Cancelled</option>
                    </select>
                </div>

                <div className="form-actions">
                    <Link className="button button--secondary" to="/my-events">
                        Cancel
                    </Link>

                    <button className="button button--primary" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Creating…" : "Create Event"}
                    </button>
                </div>
            </form>
        </section>
    );
}
