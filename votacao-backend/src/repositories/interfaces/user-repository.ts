import { User } from "../../entities/user";
import { UserRole } from "../../interfaces/user-with-role";

export interface UserRepository {
    getUsersRole(): Promise<UserRole[]>;
    saveUser(user: User): Promise<User | undefined>;
    getUserById(user_id: number): Promise<User | undefined>;
    getUserByEmail(email: string): Promise<User | undefined>;
    getUserByCpf(cpf: string): Promise<User | undefined>;
}