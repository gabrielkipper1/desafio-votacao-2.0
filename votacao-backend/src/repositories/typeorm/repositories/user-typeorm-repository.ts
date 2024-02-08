import { DataSource, Repository } from "typeorm";
import { User } from "../../../entities/user";
import { TypeORMDataSource } from "../typeorm-postgres-data-source";
import { UserRepository } from "../../interfaces/user-repository";
import { UserSchema } from "../schemas/user-schema";

export class UserTypeORMRepository implements UserRepository {
    repository: Repository<User> = TypeORMDataSource.getRepository<User>(UserSchema);


    async getUserById(user_id: number): Promise<User | undefined> {
        const user: User | null = await this.repository.findOne({ where: { id: user_id } });
        return user ? user : undefined;
    }

    async saveUser(user: User): Promise<User | undefined> {
        return await this.repository.save(user);
    }
}