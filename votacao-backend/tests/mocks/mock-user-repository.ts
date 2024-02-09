import { User } from "../../src/entities/user";
import { UserRepository } from "../../src/repositories/interfaces/user-repository";

export class MockUserRepository implements UserRepository {
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
}
