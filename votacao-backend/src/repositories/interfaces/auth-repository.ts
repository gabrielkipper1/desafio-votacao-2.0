import { UserPassword } from "../../entities/user-password";

export interface AuthRepository {
    saveCredentials(id: number, password: string): Promise<boolean>;
    getCredentials(id: number): Promise<UserPassword | undefined>;
}