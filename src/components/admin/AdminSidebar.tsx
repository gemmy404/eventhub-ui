import { NavLink } from "react-router-dom";

const navigationItems = [
    {
        label: "Dashboard",
        path: "/admin",
        enabled: true,
    },
    {
        label: "Users",
        path: "/admin/users",
        enabled: true,
    },
    {
        label: "Events",
        path: "/admin/events",
        enabled: false,
    },
    {
        label: "Tickets",
        path: "/admin/tickets",
        enabled: false,
    },
    {
        label: "Analytics",
        path: "/admin/analytics",
        enabled: false,
    },
    {
        label: "Settings",
        path: "/admin/settings",
        enabled: false,
    },
];

export function AdminSidebar() {
    return (
        <aside className="admin-sidebar">
            <div className="admin-sidebar__brand">
                <span className="admin-sidebar__brand-mark">H</span>

                <div>
                    <strong>EventHub</strong>
                    <span>Admin</span>
                </div>
            </div>

            <nav className="admin-sidebar__navigation" aria-label="Admin navigation">
                {navigationItems.map((item) =>
                    item.enabled ? (
                        <NavLink
                            key={item.label}
                            to={item.path}
                            end={item.path === "/admin"}
                            className={({ isActive }) => `admin-sidebar__link${isActive ? " is-active" : ""}`}
                        >
                            <span>{item.label}</span>
                        </NavLink>
                    ) : (
                        <span
                            key={item.label}
                            className="admin-sidebar__link admin-sidebar__link--disabled"
                            aria-disabled="true"
                        >
                            <span>{item.label}</span>
                            <small>Soon</small>
                        </span>
                    ),
                )}
            </nav>
        </aside>
    );
}
