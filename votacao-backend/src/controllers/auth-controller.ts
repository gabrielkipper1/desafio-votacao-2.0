import { JWTEncoder } from "../data-parsers/credentials/jwt-encoder";
import { User } from "../entities/user";
import { UserSignInCredentials } from "../interfaces/user-sign-in-credentials";
import { UserSignUpCredentials } from "../interfaces/user-sign-up-credentials";
import { AuthRepository } from "../repositories/interfaces/auth-repository";
import { UserRepository } from "../repositories/interfaces/user-repository";
import { TokenController } from "./token-controller";
import { PasswordController } from "./password-controller";
import { UserController } from "./user-controller";

export class AuthController {
    userRepository: UserController;
    passwordController: PasswordController;
    tokenController: TokenController;

    constructor(passwordController: PasswordController, userRepository: UserController, tokenController: TokenController) {
        this.passwordController = passwordController;
        this.userRepository = userRepository;
        this.tokenController = tokenController;
    }

    async signIn(credentials: UserSignInCredentials): Promise<object> {
        const user = await this.userRepository.getUserByEmail(credentials.email);
        if (!user) {
            throw new Error("User not found");
        }

        const validatedUser = await this.passwordController.validatePassword(user, credentials);
        if (!validatedUser) {
            throw new Error("Invalid password");
        }

        const token = await this.tokenController.createToken(validatedUser);

        return {
            "token": token
        };
    }

    async signup(credentials: UserSignUpCredentials): Promise<object> {
        const user = await this.userRepository.getUserByEmail(credentials.email);
        if (user) {
            throw new Error("User already exists");
        }

        const savedUser = await this.userRepository.createUser(User.create(credentials.name, credentials.email, credentials.cpf));
        if (!savedUser) {
            throw new Error("Error saving user");
        }

        const savedCredentials = await this.passwordController.createPassword(savedUser, credentials);
        if (!savedCredentials) {
            throw new Error("Error saving credentials");
        }

        const token = await this.tokenController.createToken(savedUser);
        return {
            "token": token
        };
    }

    async validate(token: string | undefined): Promise<object> {
        if (!token) {
            throw new Error("Invalid token");
        }
        const splitBearer = token.split(" ")[1];
        return await this.tokenController.verifyToken(splitBearer);
    }

}