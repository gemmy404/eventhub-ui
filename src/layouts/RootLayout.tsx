import { Outlet } from 'react-router-dom'

import { Footer } from '../components/common/Footer'
import { Navbar } from '../components/common/Navbar'

export function RootLayout() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-content container">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
