import { Router } from "express";
import { AuthController } from "../controllers/auth-controller";
import { AuthRepository } from "../repositories/interfaces/auth-repository";
import { PasswordEncoder } from "../interfaces/password-encoder";
import { UserSignInCredentials } from "../interfaces/user-sign-in-credentials";
import { UserSignUpCredentials } from "../interfaces/user-sign-up-credentials";
import { TokenEncoder } from "../interfaces/token-encoder";
import { UserRepository } from "../repositories/interfaces/user-repository";
import { User } from "../entities/user";
import { constants } from "node:buffer";
import { UserController } from "../controllers/user-controller";
import { PasswordController } from "../controllers/password-controller";
import { TokenController } from "../controllers/token-controller";

export const AuthRoutes = (tokenController: TokenController, userRepository: UserController, passwordController: PasswordController) => {
    const controller = new AuthController(passwordController, userRepository, tokenController);
    const router = Router();

    router.post('/signin', async (req, res) => {
        const signInCredentials = req.body as UserSignInCredentials;
        const signInResult = await controller.signIn(signInCredentials);
        res.status(200).send(signInResult);
    });

    router.post('/signup', async (req, res) => {
        const signUpCredentials = req.body as UserSignUpCredentials;
        const signUpResult = await controller.signup(signUpCredentials);
        res.status(200).send(signUpResult);
    });

    router.post('/validate', async (req, res) => {
        const signUpResult = await controller.validate(req.headers.authorization);
        res.status(200).send(signUpResult);
    });

    return router;
};