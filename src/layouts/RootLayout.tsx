import { Outlet } from 'react-router-dom'

export function RootLayout() {
  return (
    <div className="app-shell">
      <main className="app-content">
        <Outlet />
      </main>
    </div>
  )
}
