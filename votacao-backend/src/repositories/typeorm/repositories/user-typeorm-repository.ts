import { ConnectionPoolClosedEvent, Repository } from "typeorm";
import { User } from "../../../entities/user";
import { TypeORMDataSource } from "../data-sources/typeorm-postgres-data-source";
import { UserRepository } from "../../interfaces/user-repository";
import { UserSchema } from "../schemas/user-schema";
import { UserAdmin } from "../../../entities/user-admin";
import { UserRole } from "../../../interfaces/user-with-role";

export class UserTypeORMRepository implements UserRepository {
    repository: Repository<User>;

    constructor(repository: Repository<User>) {
        this.repository = repository;
    }
    async getUsersRole(): Promise<UserRole[]> {
        const query = await this.repository.createQueryBuilder("user")
            .select(['user.id as id', 'user.name as name', 'user.email as email', 'admin.active as isAdmin'])
            .leftJoin('user_admin', 'admin', 'user.id = admin.user_id')
            .getRawMany();

        const convertion = query.map((user) => user as UserRole);
        return convertion;
    }


    async getUserByEmail(email: string): Promise<User | undefined> {
        const user = await this.repository.findOne({ where: { email: email } });
        return user ? user : undefined;
    }

    async getUserById(user_id: number): Promise<User | undefined> {
        const user: User | null = await this.repository.findOne({ where: { id: user_id } });
        return user ? user : undefined;
    }

    async saveUser(user: User): Promise<User | undefined> {
        return await this.repository.save(user);
    }

    async getUserByCpf(cpf: string): Promise<User | undefined> {
        const user = await this.repository.findOne({ where: { cpf: cpf } });
        return user ? user : undefined;
    }
}