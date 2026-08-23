import { useState } from "react";

import { checkInTicket } from "../../services/api/tickets";
import type { ApiError } from "../../types/api";

interface CheckInTicketButtonProps {
    ticketCode: string;
    onCheckedIn: () => void;
}

export function CheckInTicketButton({ ticketCode, onCheckedIn }: CheckInTicketButtonProps) {
    const [isCheckingIn, setIsCheckingIn] = useState(false);
    const [error, setError] = useState<ApiError>();

    async function handleCheckIn() {
        try {
            setError(undefined);
            setIsCheckingIn(true);

            await checkInTicket({
                ticketCode,
            });

            onCheckedIn();
        } catch (requestError: unknown) {
            setError(requestError as ApiError);
        } finally {
            setIsCheckingIn(false);
        }
    }

    return (
        <div className="ticket-check-in">
            {error && (
                <p className="ticket-check-in__error" role="alert">
                    {error.message ?? "Unable to check in this ticket."}
                </p>
            )}

            <button
                className="button button--primary"
                type="button"
                onClick={handleCheckIn}
                disabled={isCheckingIn}
            >
                {isCheckingIn ? "Checking in…" : "Check In"}
            </button>
        </div>
    );
}
