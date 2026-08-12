import type { AuthUser } from '../types/auth'

const accessTokenKey = 'eventhub.accessToken'
const userKey = 'eventhub.user'

function isAuthUser(value: unknown): value is AuthUser {
  if (typeof value !== 'object' || value === null) return false
  const user = value as Record<string, unknown>
  return typeof user.id === 'string' && typeof user.email === 'string' && typeof user.name === 'string'
    && (user.role === 'ADMIN' || user.role === 'ORGANIZER' || user.role === 'USER')
}

export function getAccessToken(): string | null {
  return typeof window === 'undefined' ? null : window.localStorage.getItem(accessTokenKey)
}

export function setAccessToken(accessToken: string): void {
  window.localStorage.setItem(accessTokenKey, accessToken)
}

export function removeAccessToken(): void {
  window.localStorage.removeItem(accessTokenKey)
}

export function getStoredUser(): AuthUser | null {
  if (typeof window === 'undefined') return null
  const storedUser = window.localStorage.getItem(userKey)
  if (!storedUser) return null
  try {
    const user: unknown = JSON.parse(storedUser)
    return isAuthUser(user) ? user : null
  } catch {
    return null
  }
}

export function setStoredUser(user: AuthUser): void {
  window.localStorage.setItem(userKey, JSON.stringify(user))
}

export function removeStoredUser(): void {
  window.localStorage.removeItem(userKey)
}
