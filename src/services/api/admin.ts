import type { AppResponseDto } from "../../types/api";
import type { AdminUser, GetUsersParams, CreateUserRequest, CreateUserResponse } from "../../types/admin";
import { apiClient } from "./client";

export async function getAllUsers(params: GetUsersParams = {}): Promise<AppResponseDto<AdminUser[]>> {
    const response = await apiClient.get<AppResponseDto<AdminUser[]>>("/admin/users", {
        params,
    });

    return response.data;
}

export async function createUser(request: CreateUserRequest): Promise<AppResponseDto<CreateUserResponse>> {
    const response = await apiClient.post<AppResponseDto<CreateUserResponse>>("/admin/users", request);

    return response.data;
}
