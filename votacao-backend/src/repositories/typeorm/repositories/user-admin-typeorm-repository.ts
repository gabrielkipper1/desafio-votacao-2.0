import { Repository } from "typeorm";
import { UserAdmin } from "../../../entities/user-admin";
import { AdminRepository } from "../../interfaces/admin-repository";

export class UserAdminTypeOrmRepository implements AdminRepository {
    private readonly repository: Repository<UserAdmin>;

    constructor(repository: Repository<UserAdmin>) {
        this.repository = repository;
    }

    async isUserAdmin(userId: number): Promise<boolean> {
        const userAdmin = await this.repository.findOne({ where: { userId: userId, active: true } });
        return userAdmin !== null ? true : false;
    }
}
