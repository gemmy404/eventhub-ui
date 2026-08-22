import { useEffect, useState } from "react";

import { UserTable } from "../../components/admin/UserTable";
import { getAllUsers } from "../../services/api/admin";
import type { ApiError, PaginationDto } from "../../types/api";
import type { AdminUser } from "../../types/admin";
import type { UserRole } from "../../types/auth";

const pageSize = 10;

const roleOptions: Array<{ label: string; value: UserRole | "" }> = [
    { label: "All roles", value: "" },
    { label: "Users", value: "USER" },
    { label: "Organizers", value: "ORGANIZER" },
    { label: "Admins", value: "ADMIN" },
];

export function AdminUsersPage() {
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [pagination, setPagination] = useState<PaginationDto>();
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRole, setSelectedRole] = useState<UserRole | "">("");
    const [error, setError] = useState<ApiError>();
    const [isLoading, setIsLoading] = useState(true);
    const [retryCount, setRetryCount] = useState(0);

    useEffect(() => {
        let isCurrent = true;

        async function loadUsers() {
            setIsLoading(true);
            setError(undefined);

            try {
                const response = await getAllUsers({
                    page: currentPage,
                    size: pageSize,
                    ...(selectedRole ? { role: selectedRole } : {}),
                });

                if (!isCurrent) return;

                setUsers(response.data);
                setPagination(response.pagination);
            } catch (requestError: unknown) {
                if (isCurrent) {
                    setError(requestError as ApiError);
                }
            } finally {
                if (isCurrent) {
                    setIsLoading(false);
                }
            }
        }

        void loadUsers();

        return () => {
            isCurrent = false;
        };
    }, [currentPage, selectedRole, retryCount]);

    function handleRoleChange(role: UserRole | "") {
        setSelectedRole(role);
        setCurrentPage(1);
    }

    return (
        <section className="admin-users-page" aria-labelledby="admin-users-title">
            <header className="page-heading">
                <p className="eyebrow">User Management</p>

                <div className="admin-users-page__heading-row">
                    <div>
                        <h1 id="admin-users-title">Users</h1>

                        <p>Manage EventHub users and organizers from one place.</p>
                    </div>

                    <button className="button button--primary" type="button">
                        Create User
                    </button>
                </div>
            </header>

            <div className="admin-users-page__toolbar">
                <label htmlFor="user-role-filter">Filter by role</label>

                <select
                    id="user-role-filter"
                    value={selectedRole}
                    onChange={(event) => handleRoleChange(event.target.value as UserRole | "")}
                >
                    {roleOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            {isLoading && (
                <div className="page-state" role="status">
                    <span className="loading-indicator" />
                    Loading users…
                </div>
            )}

            {!isLoading && error && (
                <div className="page-state page-state--error" role="alert">
                    <h2>We couldn’t load users</h2>

                    <p>{error.message ?? "Please check your connection and try again."}</p>

                    <button
                        className="button button--primary"
                        type="button"
                        onClick={() => setRetryCount((count) => count + 1)}
                    >
                        Try again
                    </button>
                </div>
            )}

            {!isLoading && !error && users.length === 0 && (
                <div className="page-state">
                    <h2>No users found</h2>

                    <p>No users match the selected filter.</p>
                </div>
            )}

            {!isLoading && !error && users.length > 0 && (
                <>
                    <UserTable users={users} />

                    {pagination && pagination.totalPages > 1 && (
                        <nav className="pagination" aria-label="Users pagination">
                            <button
                                className="button button--secondary"
                                type="button"
                                disabled={!pagination.hasPrevPage}
                                onClick={() => setCurrentPage((page) => page - 1)}
                            >
                                Previous
                            </button>

                            <span>
                                Page {pagination.currentPage} of {pagination.totalPages}
                            </span>

                            <button
                                className="button button--primary"
                                type="button"
                                disabled={!pagination.hasNextPage}
                                onClick={() => setCurrentPage((page) => page + 1)}
                            >
                                Next
                            </button>
                        </nav>
                    )}
                </>
            )}
        </section>
    );
}
