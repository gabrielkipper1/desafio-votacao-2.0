import { UserAdmin } from "../../entities/user-admin";

export interface AdminRepository {
    isUserAdmin(userId: number): Promise<boolean>;
    setAdmin(userId: number, active: boolean): Promise<UserAdmin>;
}