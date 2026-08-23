import type { UserRole } from "./auth";

export interface AdminUser {
    id: string;
    email: string;
    name: string;
    role: UserRole;
}

export interface GetUsersParams {
    page?: number;
    size?: number;
    role?: UserRole;
}

export interface CreateUserRequest {
    name: string;
    email: string;
    password: string;
    role: UserRole;
}

export interface CreateUserResponse {
    userId: string;
}
