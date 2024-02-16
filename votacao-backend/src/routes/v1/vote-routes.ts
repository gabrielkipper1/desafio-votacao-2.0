import { Router } from "express";
import { VoteRepository } from "../../repositories/interfaces/vote-repository";
import { VoteController } from "../../controllers/vote-controller";
import { VotePostData } from "../../interfaces/vote-post-data";
import { UserJWTMiddleware } from "../../middlewares/user-jwt-middleware";
import { UserJsonParser } from "../../data-parsers/json/user-from-json";

export const VoteRoutes = (repository: VoteRepository) => {
    const router = Router();
    const controller = new VoteController(repository);

    router.get('/vote/topic/:topicId', async (req, res) => {
        const votes = await controller.getVotesByTopicId(Number(req.params.topicId));
        res.status(200).send(
            votes,
        );
    });

    router.post('/vote', UserJWTMiddleware, async (req, res) => {
        const vote = req.body as VotePostData
        const user = new UserJsonParser().parse(req.body.user);
        const createdVote = await controller.createVote(user, vote);

        if (!createdVote) {
            res.status(500).send("Error creating vote");
        }

        res.status(201).send(vote);
    })

    return router;
};
