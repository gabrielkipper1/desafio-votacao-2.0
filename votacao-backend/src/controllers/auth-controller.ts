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
import { BadRequestError } from "../exceptions/bad-request-error";
import { ERROR_MESSAGES } from "../exceptions/erro-messages";
import { constrainedMemory } from "process";
import { validateCPF } from "../helper-functions/validate-cpf";
import { validateEmail } from "../helper-functions/validate-email";

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
        //check if user exists, if not, throw error
        console.log(credentials);
        if (!credentials.email || !credentials.password) throw new BadRequestError(ERROR_MESSAGES.INVALID_CREDENTIAL_DATA)

        const user = await this.userRepository.getUserByEmail(credentials.email);
        if (!user) throw new BadRequestError(ERROR_MESSAGES.USER_NOT_FOUND);

        const validatedUser = await this.passwordController.validatePassword(user, credentials);
        if (!validatedUser) throw new BadRequestError(ERROR_MESSAGES.PASSWORD_INCORRECT);

        const isAdmin = await this.userAdminContrller.isUserAdmin(validatedUser.id as number);
        const token = await this.tokenController.createToken(validatedUser);
        if (!token) throw new BadRequestError(ERROR_MESSAGES.ERROR_CREATING_TOKEN)

        return {
            "user": validatedUser,
            "isAdmin": isAdmin,
            "token": token
        };
    }

    async signup(credentials: UserSignUpCredentials): Promise<object> {
        //check if user email and cpf already exists, if not, create user and credentials
        //also check if cpf and email are valid
        const userCheck = await this.userRepository.getUserByEmail(credentials.email);
        if (userCheck) throw new BadRequestError(ERROR_MESSAGES.USER_ALREADY_EXISTS);

        const cpfCheck = await this.userRepository.getUserByCpf(credentials.cpf);
        if (cpfCheck) throw new BadRequestError(ERROR_MESSAGES.CPF_ALREADY_EXISTS);

        const isCpfValid = validateCPF(credentials.cpf);
        if (!isCpfValid) throw new BadRequestError(ERROR_MESSAGES.INVALID_CPF);

        const isEmailValid = validateEmail(credentials.email);
        if (!isEmailValid) throw new BadRequestError(ERROR_MESSAGES.INVALID_EMAIL);

        const savedUser = await this.userRepository.createUser(User.create(credentials.name, credentials.email, credentials.cpf));
        if (!savedUser) throw new BadRequestError(ERROR_MESSAGES.ERROR_CREATING_USER);

        const savedCredentials = await this.passwordController.createPassword(savedUser, credentials);
        if (!savedCredentials) throw new BadRequestError(ERROR_MESSAGES.ERROR_CREATING_CREDENTIALS);

        const isAdmin = await this.userAdminContrller.isUserAdmin(savedUser.id as number);
        const token = await this.tokenController.createToken(savedUser);
        if (!token) throw new BadRequestError(ERROR_MESSAGES.ERROR_CREATING_TOKEN);

        return {
            "user": savedUser,
            "isAdmin": isAdmin,
            "token": token
        };
    }

    async validate(token: string | undefined): Promise<object> {
        if (!token) throw new BadRequestError(ERROR_MESSAGES.INVALID_TOKEN);

        const splitBearer = token.replace('Bearer ', '');
        const payload = await this.tokenController.verifyToken(splitBearer);
        const isAdmin = await this.userAdminContrller.isUserAdmin(payload.id);
        return {
            "user": payload,
            "isAdmin": isAdmin,
            "token": splitBearer
        };
    }

}