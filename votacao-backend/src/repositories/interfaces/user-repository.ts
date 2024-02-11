import { User } from "../../entities/user";

export interface UserRepository {
    saveUser(user: User): Promise<User | undefined>;
    getUserById(user_id: number): Promise<User | undefined>;
    getUserByEmail(email: string): Promise<User | undefined>;
}