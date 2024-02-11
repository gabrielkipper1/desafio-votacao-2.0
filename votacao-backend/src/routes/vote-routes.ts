import { Router } from "express";
import { VoteRepository } from "../repositories/interfaces/vote-repository";
import { VoteJsonParser } from "../data-parsers/json/vote-from-json";
import { VoteController } from "../controllers/vote-controller";
import { VotePostData } from "../interfaces/vote-post-data";

export const VoteRoutes = (repository: VoteRepository) => {
    const router = Router();
    const parser = new VoteJsonParser();
    const controller = new VoteController(repository);

    router.get('/vote/topic/:topicId', async (req, res) => {
        const votes = await controller.getVotesByTopicId(Number(req.params.topicId));
        res.status(200).send(
            votes,
        );
    });

    router.post('/vote', async (req, res) => {
        const vote = req.body as VotePostData
        console.log(vote);
        const createdVote = await controller.createVote(vote);

        if (!createdVote) {
            res.status(500).send("Error creating vote");
        }

        res.status(201).send(vote);
    })

    return router;
};
