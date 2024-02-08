import { User } from "../entities/user";
import { UserRepository } from "../repositories/interfaces/user-repository";

export class UserController {
    repository: UserRepository;

    constructor(repository: UserRepository) {
        this.repository = repository;
    }

    async createUser(user: User): Promise<User | undefined> {
        return this.repository.saveUser(user);
    }

    async getUserById(user_id: number): Promise<User | undefined> {
        return await this.repository.getUserById(user_id);
    }

}