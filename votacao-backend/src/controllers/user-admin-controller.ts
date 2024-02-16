import { UserAdmin } from "../entities/user-admin";
import { BadRequestError } from "../exceptions/bad-request-error";
import { ERROR_MESSAGES } from "../exceptions/erro-messages";
import { SetAdminData } from "../interfaces/set-admin-data";
import { AdminRepository } from "../repositories/interfaces/admin-repository";

export class UserAdminController {
    repository: AdminRepository;

    constructor(repository: AdminRepository) {
        this.repository = repository;
    }

    async isUserAdmin(userId: number): Promise<boolean> {
        if (!userId) return false;

        return this.repository.isUserAdmin(userId);
    }

    async setAdmin(requester: number, data: SetAdminData): Promise<UserAdmin> {
        if (requester === data.userId) throw new BadRequestError(ERROR_MESSAGES.INVALID_USER_ID);
        if (!requester) throw new BadRequestError(ERROR_MESSAGES.INVALID_USER_ID);
        if (!data.userId) throw new BadRequestError(ERROR_MESSAGES.INVALID_USER_ID);

        const requesterIsAdmin = await this.repository.isUserAdmin(requester);
        if (!requesterIsAdmin) throw new BadRequestError(ERROR_MESSAGES.NO_PRIVILEGES);

        return await this.repository.setAdmin(data.userId, data.active);
    }
}