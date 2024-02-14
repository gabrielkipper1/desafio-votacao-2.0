import { User } from "../entities/user";
import { BadRequestError } from "../exceptions/bad-request-error";
import { ERROR_MESSAGES } from "../exceptions/erro-messages";
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
        if (!password) throw new BadRequestError(ERROR_MESSAGES.PASSWORD_MISSING)
        return await this.passwordDecoder.encode(password);
    }

    async compare(password: string, hash: string): Promise<boolean> {
        if (!password) throw new BadRequestError(ERROR_MESSAGES.PASSWORD_MISSING)
        if (!hash) throw new BadRequestError(ERROR_MESSAGES.INVALID_PASSWORD_HASH)

        const result = await this.passwordDecoder.compare(password, hash);
        if (!result) throw new BadRequestError(ERROR_MESSAGES.PASSWORD_INCORRECT)
        return result;
    }

    async createPassword(user: User, credentials: UserSignUpCredentials): Promise<boolean> {
        if (!user) throw new BadRequestError(ERROR_MESSAGES.INVALID_USER_ID)

        const credential = await this.passwordRepository.getCredentials(user.id as number);
        if (credential) throw new BadRequestError(ERROR_MESSAGES.USER_ALREADY_HAS_CREDENTIALS)

        const hash = await this.passwordDecoder.encode(credentials.password);
        if (!hash) throw new BadRequestError(ERROR_MESSAGES.COULD_NOT_ENCODE_PASSWORD)

        return await this.passwordRepository.saveCredentials(user.id as number, hash);
    }

    async validatePassword(user: User, credentials: UserSignInCredentials): Promise<User | undefined> {
        if (!user) throw new BadRequestError(ERROR_MESSAGES.USER_NOT_FOUND)

        const hash = await this.passwordRepository.getCredentials(user.id as number);
        if (!hash) throw new BadRequestError(ERROR_MESSAGES.CREDENTIAL_NOT_FOUND)

        const passwordCheck = await this.compare(credentials.password, hash.password);
        if (!passwordCheck) throw new BadRequestError(ERROR_MESSAGES.PASSWORD_INCORRECT)

        return user;
    }
}