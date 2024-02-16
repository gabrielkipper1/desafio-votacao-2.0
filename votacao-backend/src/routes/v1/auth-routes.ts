import { Router } from "express";
import { AuthController } from "../../controllers/auth-controller";
import { AuthRepository } from "../../repositories/interfaces/auth-repository";
import { PasswordEncoder } from "../../interfaces/password-encoder";
import { UserSignInCredentials } from "../../interfaces/user-sign-in-credentials";
import { UserSignUpCredentials } from "../../interfaces/user-sign-up-credentials";
import { TokenEncoder } from "../../interfaces/token-encoder";
import { UserRepository } from "../../repositories/interfaces/user-repository";
import { User } from "../../entities/user";
import { constants } from "node:buffer";
import { UserController } from "../../controllers/user-controller";
import { PasswordController } from "../../controllers/password-controller";
import { TokenController } from "../../controllers/token-controller";
import { UserAdminController } from "../../controllers/user-admin-controller";
import { UserJWTMiddleware } from "../../middlewares/user-jwt-middleware";
import { AuthMiddleware } from "../../middlewares/auth-middleware";
import { SetAdminData } from "../../interfaces/set-admin-data";

export const AuthRoutes = (tokenController: TokenController, userRepository: UserController, passwordController: PasswordController, adminController: UserAdminController) => {
    const controller = new AuthController(passwordController, userRepository, tokenController, adminController);
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

    router.get('/admin', UserJWTMiddleware, async (req, res) => {
        const userId = req.body["userId"] as string
        const isAdmin = await adminController.isUserAdmin(Number(userId));
        res.status(200).send(isAdmin);
    })

    router.post('/admin', AuthMiddleware, async (req, res) => {
        const requester = req.body["userId"] as string
        const data = req.body["data"] as SetAdminData;
        const result = await adminController.setAdmin(Number(requester), data);
        res.status(200).send({
            "isadmin": result.active,
            "id": result.userId
        });
    })

    return router;
};