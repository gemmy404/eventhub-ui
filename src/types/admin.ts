import type { PaginationDto } from "./api";
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

// export interface AdminUsersResponse {
//     users: AdminUser[];
//     pagination?: PaginationDto;
// }
