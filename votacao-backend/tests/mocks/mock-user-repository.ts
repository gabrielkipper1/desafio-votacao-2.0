import { User } from "../../src/entities/user";
import { UserRole } from "../../src/interfaces/user-with-role";
import { UserRepository } from "../../src/repositories/interfaces/user-repository";

export class MockUserRepository implements UserRepository {
    private admin: UserRole[] = [];
    private users: User[] = [];

    async saveUser(user: User): Promise<User | undefined> {
        this.users.push(user);
        return user;
    }

    async getUserById(user_id: number): Promise<User | undefined> {
        return this.users.find(user => user.id === user_id);
    }

    async getUserByEmail(email: string): Promise<User | undefined> {
        return this.users.find(user => user.email === email);
    }

    async getUserByCpf(cpf: string): Promise<User | undefined> {
        return this.users.find(user => user.cpf === cpf);
    }

    async getUsersRole(): Promise<UserRole[]> {
        return this.admin;
    }
}
