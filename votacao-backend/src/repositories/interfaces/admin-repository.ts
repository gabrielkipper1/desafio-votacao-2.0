export interface AdminRepository {
    isUserAdmin(userId: number): Promise<boolean>;
}