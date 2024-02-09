import { Router } from "express";
import { VoteRepository } from "../repositories/interfaces/vote-repository";
import { VoteJsonParser } from "../data-parsers/json/vote-from-json";
import { VoteController } from "../controllers/vote-controller";

export const VoteRoutes = (repository: VoteRepository) => {
    const router = Router();
    const parser = new VoteJsonParser();
    const controller = new VoteController(repository);

    router.get('/votes', async (req, res) => {
        const votingSessions = await controller.getVotesByTopicId(Number(req.query.topic_id));
        res.status(200).send({
            "voting_sessions": votingSessions,
        });
    });

    return router;
};
