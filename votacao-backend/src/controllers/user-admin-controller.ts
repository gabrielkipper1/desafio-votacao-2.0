import { AdminRepository } from "../repositories/interfaces/admin-repository";

export class UserAdminController {
    repository: AdminRepository;

    constructor(repository: AdminRepository) {
        this.repository = repository;
    }

    async isUserAdmin(userId: number): Promise<boolean> {
        return this.repository.isUserAdmin(userId);
    }
}