const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

if (!apiBaseUrl) {
  console.warn('VITE_API_BASE_URL is not configured. API requests will use relative URLs.')
}

export const env = {
  apiBaseUrl: apiBaseUrl ?? '',
} as const
