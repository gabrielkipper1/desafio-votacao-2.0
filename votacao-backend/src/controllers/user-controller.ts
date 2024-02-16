import { User } from "../entities/user";
import { BadRequestError } from "../exceptions/bad-request-error";
import { ERROR_MESSAGES } from "../exceptions/erro-messages";
import { UserRole } from "../interfaces/user-with-role";
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
        if (!user_id) throw new BadRequestError(ERROR_MESSAGES.INVALID_USER_ID);
        return await this.repository.getUserById(user_id);
    }

    async getUserByEmail(email: string): Promise<User | undefined> {
        if (email === undefined && email === '') throw new BadRequestError(ERROR_MESSAGES.INVALID_EMAIL)
        return await this.repository.getUserByEmail(email);
    }

    async getUserByCpf(cpf: string): Promise<User | undefined> {
        if (cpf === undefined && cpf === '') throw new BadRequestError(ERROR_MESSAGES.INVALID_CPF)
        return await this.repository.getUserByCpf(cpf);
    }

    async getUsersRole(): Promise<UserRole[]> {
        return await this.repository.getUsersRole();
    }
}