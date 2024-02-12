import { JWTEncoder } from "../data-parsers/credentials/jwt-encoder";
import { User } from "../entities/user";
import { UserSignInCredentials } from "../interfaces/user-sign-in-credentials";
import { UserSignUpCredentials } from "../interfaces/user-sign-up-credentials";
import { AuthRepository } from "../repositories/interfaces/auth-repository";
import { UserRepository } from "../repositories/interfaces/user-repository";
import { TokenController } from "./token-controller";
import { PasswordController } from "./password-controller";
import { UserController } from "./user-controller";
import { UserAdminController } from "./user-admin-controller";

export class AuthController {
    userRepository: UserController;
    passwordController: PasswordController;
    tokenController: TokenController;
    userAdminContrller: UserAdminController;

    constructor(passwordController: PasswordController, userRepository: UserController, tokenController: TokenController, userAdminContrller: UserAdminController) {
        this.passwordController = passwordController;
        this.userRepository = userRepository;
        this.tokenController = tokenController;
        this.userAdminContrller = userAdminContrller;
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

        const isAdmin = await this.userAdminContrller.isUserAdmin(validatedUser.id as number);
        const token = await this.tokenController.createToken(validatedUser);

        return {
            "user": validatedUser,
            "isAdmin": isAdmin,
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

        const isAdmin = await this.userAdminContrller.isUserAdmin(savedUser.id as number);
        const token = await this.tokenController.createToken(savedUser);
        return {
            "user": savedUser,
            "isAdmin": isAdmin,
            "token": token
        };
    }

    async validate(token: string | undefined): Promise<object> {
        if (!token) {
            throw new Error("token is empty");
        }
        const splitBearer = token.split(" ")[1];
        const payload = await this.tokenController.verifyToken(splitBearer);
        const isAdmin = await this.userAdminContrller.isUserAdmin(payload.id);
        return {
            "user": payload,
            "isAdmin": isAdmin,
            "token": splitBearer
        };
    }

}