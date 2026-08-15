import { createContext, useEffect, useContext, useMemo, useState, type ReactNode } from "react";

import { login as loginRequest, register as registerRequest } from "../services/api/auth";
import type { LoginRequest, RegisterRequest, AuthUser } from "../types/auth";
import {
    getAccessToken,
    getStoredUser,
    removeAccessToken,
    removeStoredUser,
    setAccessToken,
    setStoredUser,
} from "../utils/authStorage";

interface AuthContextValue {
    user: AuthUser | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (request: LoginRequest) => Promise<void>;
    register: (request: RegisterRequest) => ReturnType<typeof registerRequest>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [accessToken, setToken] = useState<string | null>(() => getAccessToken());
    const [user, setUser] = useState<AuthUser | null>(() => getStoredUser());
    const [isLoading, setIsLoading] = useState(false);

    function logout() {
        removeAccessToken();
        removeStoredUser();
        setToken(null);
        setUser(null);
    }

    useEffect(() => {
        function handleUnauthorized() {
            logout();
        }

        window.addEventListener("auth:unauthorized", handleUnauthorized);

        return () => {
            window.removeEventListener("auth:unauthorized", handleUnauthorized);
        };
    }, []);

    async function login(request: LoginRequest) {
        setIsLoading(true);
        try {
            const response = await loginRequest(request);
            setAccessToken(response.data.accessToken);
            setStoredUser(response.data.user);
            setToken(response.data.accessToken);
            setUser(response.data.user);
        } finally {
            setIsLoading(false);
        }
    }

    async function register(request: RegisterRequest) {
        setIsLoading(true);
        try {
            return await registerRequest(request);
        } finally {
            setIsLoading(false);
        }
    }

    const value = useMemo(
        () => ({
            user,
            accessToken,
            isAuthenticated: Boolean(accessToken && user),
            isLoading,
            login,
            register,
            logout,
        }),
        [accessToken, user, isLoading],
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// The hook is colocated with its provider so consumers share one private context instance.
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextValue {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider.");
    return context;
}
