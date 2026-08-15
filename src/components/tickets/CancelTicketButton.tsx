import { useState } from "react";

import { cancelTicket } from "../../services/api/tickets";

interface CancelTicketButtonProps {
    ticketId: string;
    onCancelled: () => void;
}

export default function CancelTicketButton({ ticketId, onCancelled }: CancelTicketButtonProps) {
    const [isCancelling, setIsCancelling] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleCancel() {
        const confirmed = window.confirm("Are you sure you want to cancel this ticket?");

        if (!confirmed) return;

        try {
            setIsCancelling(true);
            setError(null);

            await cancelTicket(ticketId);

            onCancelled();
        } catch (error) {
            const apiError = error as {
                message?: string;
            };

            setError(apiError.message ?? "Failed to cancel ticket.");
        } finally {
            setIsCancelling(false);
        }
    }

    return (
        <div className="cancel-ticket">
            <button
                type="button"
                className="button button--danger"
                onClick={handleCancel}
                disabled={isCancelling}
            >
                {isCancelling ? "Cancelling…" : "Cancel Ticket"}
            </button>

            {error && (
                <p className="cancel-ticket__error" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
}
