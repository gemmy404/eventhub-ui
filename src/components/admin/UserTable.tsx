import type { AdminUser } from "../../types/admin";

interface UserTableProps {
    users: AdminUser[];
}

export function UserTable({ users }: UserTableProps) {
    return (
        <div className="admin-users-table-wrapper">
            <table className="admin-users-table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>
                                <span className="admin-users-table__name">{user.name}</span>
                            </td>

                            <td>
                                <span className="admin-users-table__email">{user.email}</span>
                            </td>

                            <td>
                                <span
                                    className={`admin-role-badge admin-role-badge--${user.role.toLowerCase()}`}
                                >
                                    {user.role}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
