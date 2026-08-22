import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import { createUser } from "../../services/api/admin";
import type { UserRole } from "../../types/auth";
import type { ApiError } from "../../types/api";

interface CreateUserForm {
    name: string;
    email: string;
    password: string;
    role: UserRole;
}

interface FormErrors {
    name?: string;
    email?: string;
    password?: string;
    role?: string;
}

const initialValues: CreateUserForm = {
    name: "",
    email: "",
    password: "",
    role: "ORGANIZER",
};

const roleOptions: Array<{ label: string; value: UserRole }> = [
    {
        label: "Organizer",
        value: "ORGANIZER",
    },
    {
        label: "User",
        value: "USER",
    },
    {
        label: "Admin",
        value: "ADMIN",
    },
];

export function CreateUserPage() {
    const navigate = useNavigate();

    const [values, setValues] = useState<CreateUserForm>(initialValues);
    const [errors, setErrors] = useState<FormErrors>({});
    const [serverError, setServerError] = useState<string>();
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string>();

    function validate(): FormErrors {
        const nextErrors: FormErrors = {};

        if (!values.name.trim()) {
            nextErrors.name = "Name is required";
        } else if (values.name.trim().length > 50) {
            nextErrors.name = "Name must not exceed 50 characters";
        }

        if (!values.email.trim()) {
            nextErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
            nextErrors.email = "Invalid email format";
        } else if (values.email.length > 30) {
            nextErrors.email = "Email must not exceed 30 characters";
        }

        if (!values.password) {
            nextErrors.password = "Password is required";
        } else if (values.password.length > 20) {
            nextErrors.password = "Password must not exceed 20 characters";
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])/.test(values.password)) {
            nextErrors.password =
                "Password must contain uppercase, lowercase, numbers, and special characters";
        }

        if (!values.role) {
            nextErrors.role = "Role is required";
        }

        return nextErrors;
    }

    function updateValue<K extends keyof CreateUserForm>(field: K, value: CreateUserForm[K]) {
        setValues((current) => ({
            ...current,
            [field]: value,
        }));
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const nextErrors = validate();

        setErrors(nextErrors);
        setServerError(undefined);
        setSuccessMessage(undefined);

        if (Object.keys(nextErrors).length > 0) {
            return;
        }

        try {
            setIsLoading(true);

            await createUser(values);

            setSuccessMessage("User created successfully.");
            setValues(initialValues);
            setErrors({});

            setTimeout(() => {
                navigate("/admin/users");
            }, 800);
        } catch (requestError: unknown) {
            const apiError = requestError as ApiError;

            setServerError(apiError.message ?? "Failed to create user.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <section className="admin-create-user-page" aria-labelledby="create-user-title">
            <Link className="back-link" to="/admin/users">
                ← Users
            </Link>

            <header className="page-heading">
                <p className="eyebrow">User Management</p>

                <h1 id="create-user-title">Create User</h1>

                <p>Create a new EventHub user, organizer, or administrator.</p>
            </header>

            <div className="admin-create-user-card">
                <form className="admin-create-user-form" noValidate onSubmit={handleSubmit}>
                    {serverError && (
                        <div className="form-alert" role="alert">
                            <p>{serverError}</p>
                        </div>
                    )}

                    {successMessage && (
                        <div className="form-alert form-alert--success" role="status">
                            <p>{successMessage}</p>
                        </div>
                    )}

                    <label htmlFor="create-user-name">
                        Name
                        <input
                            id="create-user-name"
                            type="text"
                            autoComplete="name"
                            value={values.name}
                            onChange={(event) => updateValue("name", event.target.value)}
                            aria-invalid={Boolean(errors.name)}
                        />
                    </label>

                    {errors.name && <p className="field-error">{errors.name}</p>}

                    <label htmlFor="create-user-email">
                        Email
                        <input
                            id="create-user-email"
                            type="email"
                            autoComplete="email"
                            value={values.email}
                            onChange={(event) => updateValue("email", event.target.value)}
                            aria-invalid={Boolean(errors.email)}
                        />
                    </label>

                    {errors.email && <p className="field-error">{errors.email}</p>}

                    <label htmlFor="create-user-password">
                        Password
                        <input
                            id="create-user-password"
                            type="password"
                            autoComplete="new-password"
                            value={values.password}
                            onChange={(event) => updateValue("password", event.target.value)}
                            aria-invalid={Boolean(errors.password)}
                        />
                    </label>

                    {errors.password && <p className="field-error">{errors.password}</p>}

                    <label htmlFor="create-user-role">
                        Role
                        <select
                            id="create-user-role"
                            value={values.role}
                            onChange={(event) => updateValue("role", event.target.value as UserRole)}
                            aria-invalid={Boolean(errors.role)}
                        >
                            {roleOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </label>

                    {errors.role && <p className="field-error">{errors.role}</p>}

                    <div className="admin-create-user-form__actions">
                        <Link className="button button--secondary" to="/admin/users">
                            Cancel
                        </Link>

                        <button className="button button--primary" type="submit" disabled={isLoading}>
                            {isLoading ? "Creating…" : "Create User"}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}
