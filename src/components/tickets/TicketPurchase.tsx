import { useState, type FormEvent } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { useAuth } from '../../contexts/AuthContext'
import { purchaseTicket } from '../../services/api/tickets'
import type { TicketResponseDto } from '../../types/tickets'
import { getApiErrorMessage, getValidationMessages } from '../../utils/authValidation'
import { formatEventDate, formatEventPrice } from '../../utils/formatters'

interface TicketPurchaseProps {
  eventId: string
}

export function TicketPurchase({ eventId }: TicketPurchaseProps) {
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  const [quantity, setQuantity] = useState(1)
  const [quantityError, setQuantityError] = useState<string | undefined>()
  const [error, setError] = useState<string | undefined>()
  const [validationMessages, setValidationMessages] = useState<string[]>([])
  const [ticket, setTicket] = useState<TicketResponseDto | undefined>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
      setQuantityError('Choose a whole number between 1 and 10.')
      return
    }
    setQuantityError(undefined)
    setError(undefined)
    setValidationMessages([])
    setIsSubmitting(true)
    try {
      const response = await purchaseTicket({ eventId, quantity })
      setTicket(response.data)
    } catch (requestError: unknown) {
      setError(getApiErrorMessage(requestError))
      setValidationMessages(getValidationMessages(requestError))
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isAuthenticated) return <section className="ticket-purchase ticket-purchase--login" aria-labelledby="purchase-title">
    <h2 id="purchase-title">Ready to attend?</h2><p>Sign in to purchase tickets for this event.</p>
    <Link className="button button--primary" to="/login" state={{ from: location.pathname }}>Login to purchase</Link>
  </section>

  if (ticket) return <section className="ticket-purchase ticket-purchase--success" aria-labelledby="purchase-success-title">
    <p className="eyebrow">Purchase successful</p><h2 id="purchase-success-title">Your ticket is confirmed in EventHub.</h2>
    <dl className="ticket-summary">
      <div><dt>Event</dt><dd>{ticket.eventTitle}</dd></div><div><dt>Quantity</dt><dd>{ticket.quantity}</dd></div>
      <div><dt>Total paid</dt><dd>{formatEventPrice(ticket.totalPrice)}</dd></div><div><dt>Status</dt><dd>{ticket.status}</dd></div>
      <div><dt>Ticket code</dt><dd className="ticket-summary__code">{ticket.ticketCode}</dd></div><div><dt>Purchased</dt><dd>{formatEventDate(ticket.purchasedAt)}</dd></div>
    </dl>
  </section>

  return <section className="ticket-purchase" aria-labelledby="purchase-title">
    <h2 id="purchase-title">Purchase tickets</h2><p>Select up to 10 tickets. Your final total is confirmed by EventHub after purchase.</p>
    <form className="purchase-form" noValidate onSubmit={handleSubmit}>
      {error && <div className="form-alert" role="alert"><p>{error}</p>{validationMessages.length > 0 && <ul>{validationMessages.map((message) => <li key={message}>{message}</li>)}</ul>}</div>}
      <label htmlFor="ticket-quantity">Ticket quantity
        <input id="ticket-quantity" type="number" min="1" max="10" step="1" value={quantity} onChange={(event) => setQuantity(Number(event.target.value))} aria-invalid={Boolean(quantityError)} aria-describedby={quantityError ? 'ticket-quantity-error' : undefined} />
      </label>
      {quantityError && <p id="ticket-quantity-error" className="field-error">{quantityError}</p>}
      <button className="button button--primary" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Purchasing…' : 'Purchase Ticket'}</button>
    </form>
  </section>
}
