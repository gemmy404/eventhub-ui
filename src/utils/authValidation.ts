import type { LoginRequest, RegisterRequest } from '../types/auth'

export type FormErrors<T> = Partial<Record<keyof T, string>>

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/

export function validateLogin(request: LoginRequest): FormErrors<LoginRequest> {
  const errors: FormErrors<LoginRequest> = {}
  if (!request.email) errors.email = 'Email is required.'
  else if (!emailPattern.test(request.email)) errors.email = 'Enter a valid email address.'
  if (!request.password) errors.password = 'Password is required.'
  return errors
}

export function validateRegistration(request: RegisterRequest): FormErrors<RegisterRequest> {
  const errors: FormErrors<RegisterRequest> = {}
  if (!request.name) errors.name = 'Name is required.'
  else if (request.name.length > 50) errors.name = 'Name must be 50 characters or fewer.'
  if (!request.email) errors.email = 'Email is required.'
  else if (!emailPattern.test(request.email)) errors.email = 'Enter a valid email address.'
  else if (request.email.length > 30) errors.email = 'Email must be 30 characters or fewer.'
  if (!request.password) errors.password = 'Password is required.'
  else if (request.password.length > 20) errors.password = 'Password must be 20 characters or fewer.'
  else if (!strongPasswordPattern.test(request.password)) errors.password = 'Use uppercase, lowercase, a number, and a special character.'
  return errors
}

export function getApiErrorMessage(error: unknown): string {
  if (typeof error === 'object' && error !== null && 'message' in error && typeof error.message === 'string') return error.message
  return 'Something went wrong. Please try again.'
}

export function getValidationMessages(error: unknown): string[] {
  if (typeof error !== 'object' || error === null || !('validationErrors' in error) || !Array.isArray(error.validationErrors)) return []
  return error.validationErrors.map((validationError) => {
    if (typeof validationError === 'string') return validationError
    if (typeof validationError === 'object' && validationError !== null && 'message' in validationError && typeof validationError.message === 'string') return validationError.message
    return 'Please review the form and try again.'
  })
}
