import { BadRequestError } from "../exceptions/bad-request-error";
import { ERROR_MESSAGES } from "../exceptions/erro-messages";
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
}