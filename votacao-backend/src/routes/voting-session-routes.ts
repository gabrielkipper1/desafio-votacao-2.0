import { Router } from "express";
import { VotingSessionJsonParser } from "../data-parsers/json/voting-session-json";
import { VotingSessionController } from "../controllers/voting-sessions-controller";
import { VotingSessionRepository } from "../repositories/interfaces/voting-session-repository";
import { VotingSession } from "../entities/voting-session";
import { VotingSessionPostData } from "../interfaces/voting-session-post-data";

export const VotingSessionRoutes = (repository: VotingSessionRepository) => {
    const router = Router();
    const parser = new VotingSessionJsonParser();
    const controller = new VotingSessionController(repository);

    router.get('/session', async (req, res) => {
        const votingSessions = await controller.getActiveVotingSessions();
        res.status(200).send({
            "voting_sessions": votingSessions,
        });
    });

    router.get('/session/:id', async (req, res) => {
        const votingSession = await controller.getVotingSessionById(Number(req.params.id));
        res.status(200).send({
            "voting_session": votingSession,
        });
    });

    router.post('/session', async (req, res) => {
        const votingSession = req.body as VotingSessionPostData
        const createdVotingTopic = await controller.createVotingSession(votingSession);

        if (!createdVotingTopic) {
            res.status(500).send("Error creating voting session");
        }

        res.status(201).send({
            "voting_session": (createdVotingTopic as VotingSession),
        });
    });

    return router;
}