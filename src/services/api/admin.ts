import type { AppResponseDto } from "../../types/api";
import type { AdminUser, GetUsersParams } from "../../types/admin";
import { apiClient } from "./client";

export async function getAllUsers(params: GetUsersParams = {}): Promise<AppResponseDto<AdminUser[]>> {
    const response = await apiClient.get<AppResponseDto<AdminUser[]>>("/admin/users", {
        params,
    });

    return response.data;
}
