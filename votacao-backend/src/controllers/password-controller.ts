import { User } from "../entities/user";
import { PasswordEncoder } from "../interfaces/password-encoder";
import { UserSignInCredentials } from "../interfaces/user-sign-in-credentials";
import { UserSignUpCredentials } from "../interfaces/user-sign-up-credentials";
import { AuthRepository } from "../repositories/interfaces/auth-repository";

export class PasswordController {
    passwordRepository: AuthRepository;
    passwordDecoder: PasswordEncoder;

    constructor(passwordRepository: AuthRepository, passwordDecoder: PasswordEncoder) {
        this.passwordDecoder = passwordDecoder;
        this.passwordRepository = passwordRepository;
    }

    async encode(password: string): Promise<string> {
        return await this.passwordDecoder.encode(password);
    }

    async compare(password: string, hash: string): Promise<boolean> {
        const result = await this.passwordDecoder.compare(password, hash);
        if (!result) {
            throw new Error("Invalid password");
        }
        return result;
    }

    async createPassword(user: User, credentials: UserSignUpCredentials): Promise<boolean> {
        const credential = await this.passwordRepository.getCredentials(user.id as number);
        if (credential) {
            return false; // credentials already exist 
        }

        const hash = await this.passwordDecoder.encode(credentials.password);
        return await this.passwordRepository.saveCredentials(user.id as number, hash);
    }

    async validatePassword(user: User, credentials: UserSignInCredentials): Promise<User | undefined> {
        const hash = await this.passwordRepository.getCredentials(user.id as number);
        if (!hash) {
            throw new Error("User credential not found");
        }

        const passwordCheck = await this.compare(credentials.password, hash.password);
        if (!passwordCheck) {
            throw new Error("Invalid password");
        }
        return user;
    }
}