import { Router } from 'express';
import { UserController } from '../../controllers/user-controller';
import { UserRepository } from '../../repositories/interfaces/user-repository';
import { User } from '../../entities/user';
import { UserJsonParser } from '../../data-parsers/json/user-from-json';
import { parse } from 'path';

export const UserRoutes = (repository: UserRepository) => {
    const router = Router();
    const parser = new UserJsonParser();
    const controller = new UserController(repository);

    router.get('/user', async (req, res) => {
        const users = await controller.getUsersRole();
        res.status(200).json({
            "users": users,
        });
    });

    router.post('/user', async (req, res) => {
        const user = parser.parse(req.body);
        const createdUser = await controller.createUser(user);

        if (!createdUser) {
            res.status(500).send("Error creating user");
        }

        res.status(201).send({
            "user": (createdUser as User),
        });
    });

    router.get('/user/:id', async (req, res) => {
        const user = await controller.getUserById(Number(req.params.id));
        if (!user) {
            res.status(404).send("User not found");
        }
        res.status(200).json({
            "user": user,
        });
    });

    return router;
};