export function AdminDashboardPage() {
    return (
        <section className="admin-dashboard" aria-labelledby="admin-dashboard-title">
            <header className="admin-dashboard__heading">
                <p className="eyebrow">EventHub Administration</p>

                <h1 id="admin-dashboard-title">Dashboard</h1>

                <p>Manage users, events, tickets, and platform activity from one place.</p>
            </header>

            <div className="admin-dashboard__grid">
                <article className="admin-dashboard__card">
                    <span>Users</span>
                    <strong>—</strong>
                    <small>Manage platform users</small>
                </article>

                <article className="admin-dashboard__card admin-dashboard__card--disabled">
                    <span>Events</span>
                    <strong>Coming Soon</strong>
                    <small>Event management</small>
                </article>

                <article className="admin-dashboard__card admin-dashboard__card--disabled">
                    <span>Tickets</span>
                    <strong>Coming Soon</strong>
                    <small>Ticket management</small>
                </article>

                <article className="admin-dashboard__card admin-dashboard__card--disabled">
                    <span>Analytics</span>
                    <strong>Coming Soon</strong>
                    <small>Platform analytics</small>
                </article>
            </div>
        </section>
    );
}
