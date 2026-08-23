import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import type { LoginRequest } from "../../types/auth";
import {
    getApiErrorMessage,
    getValidationMessages,
    validateLogin,
    type FormErrors,
} from "../../utils/authValidation";

const initialValues: LoginRequest = { email: "", password: "" };

export function LoginPage() {
    const { login, isLoading } = useAuth();
    const navigate = useNavigate();
    const [values, setValues] = useState<LoginRequest>(initialValues);
    const [errors, setErrors] = useState<FormErrors<LoginRequest>>({});
    const [serverError, setServerError] = useState<string | undefined>();
    const [validationMessages, setValidationMessages] = useState<string[]>([]);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const nextErrors = validateLogin(values);
        setErrors(nextErrors);
        setServerError(undefined);
        setValidationMessages([]);
        if (Object.keys(nextErrors).length > 0) return;
        try {
            const user = await login(values);

            if (user.role === "ADMIN") {
                navigate("/admin", { replace: true });
            } else if (user.role === "ORGANIZER") {
                navigate("/my-events", { replace: true });
            } else {
                navigate("/", { replace: true });
            }
        } catch (error: unknown) {
            setServerError(getApiErrorMessage(error));
            setValidationMessages(getValidationMessages(error));
        }
    }

    return (
        <section className="auth-page" aria-labelledby="login-title">
            <div className="auth-card">
                <p className="eyebrow">Welcome back</p>
                <h1 id="login-title">Sign in to EventHub</h1>
                <p>Continue discovering the events that matter to you.</p>
                <form className="auth-form" noValidate onSubmit={handleSubmit}>
                    {serverError && (
                        <div className="form-alert" role="alert">
                            <p>{serverError}</p>
                            {validationMessages.length > 0 && (
                                <ul>
                                    {validationMessages.map((message) => (
                                        <li key={message}>{message}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}
                    <label htmlFor="login-email">
                        Email
                        <input
                            id="login-email"
                            type="email"
                            autoComplete="email"
                            value={values.email}
                            onChange={(event) => setValues({ ...values, email: event.target.value })}
                            aria-invalid={Boolean(errors.email)}
                            aria-describedby={errors.email ? "login-email-error" : undefined}
                        />
                    </label>
                    {errors.email && (
                        <p id="login-email-error" className="field-error">
                            {errors.email}
                        </p>
                    )}
                    <label htmlFor="login-password">
                        Password
                        <input
                            id="login-password"
                            type="password"
                            autoComplete="current-password"
                            value={values.password}
                            onChange={(event) => setValues({ ...values, password: event.target.value })}
                            aria-invalid={Boolean(errors.password)}
                            aria-describedby={errors.password ? "login-password-error" : undefined}
                        />
                    </label>
                    {errors.password && (
                        <p id="login-password-error" className="field-error">
                            {errors.password}
                        </p>
                    )}
                    <button className="button button--primary" type="submit" disabled={isLoading}>
                        {isLoading ? "Signing in…" : "Login"}
                    </button>
                </form>
                <p className="auth-card__switch">
                    New to EventHub? <Link to="/register">Create an account</Link>
                </p>
            </div>
        </section>
    );
}
