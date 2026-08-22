import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getAllUsers } from "../../services/api/admin";

export function AdminDashboardPage() {
    const [usersCount, setUsersCount] = useState<number>();
    const [isLoadingUsers, setIsLoadingUsers] = useState(true);

    useEffect(() => {
        let isCurrent = true;

        async function loadUsersCount() {
            try {
                setIsLoadingUsers(true);

                const response = await getAllUsers({
                    page: 1,
                    size: 1,
                });

                if (isCurrent) {
                    setUsersCount(response.pagination?.totalElements);
                }
            } catch {
                if (isCurrent) {
                    setUsersCount(undefined);
                }
            } finally {
                if (isCurrent) {
                    setIsLoadingUsers(false);
                }
            }
        }

        void loadUsersCount();

        return () => {
            isCurrent = false;
        };
    }, []);

    return (
        <section className="admin-dashboard" aria-labelledby="admin-dashboard-title">
            <header className="admin-dashboard__heading">
                <p className="eyebrow">EventHub Administration</p>

                <h1 id="admin-dashboard-title">Dashboard</h1>

                <p>Manage users, events, tickets, and platform activity from one place.</p>
            </header>

            <div className="admin-dashboard__grid">
                <Link className="admin-dashboard__card" to="/admin/users">
                    <span>Users</span>

                    <strong>{isLoadingUsers ? "..." : (usersCount ?? "—")}</strong>

                    <small>Manage platform users</small>
                </Link>

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
