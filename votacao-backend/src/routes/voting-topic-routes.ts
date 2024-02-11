import { Router } from "express";
import { VotingTopicJsonParser } from "../data-parsers/json/voting-topic-json-parser";
import { VotingTopicController } from "../controllers/voting-topic-controller";
import { VotingTopic } from "../entities/voting-topic";
import { VotingTopicRepository } from "../repositories/interfaces/voting-topic-repository";
import { VotingOption } from "../entities/voting-options";
import { VotingSessionController } from "../controllers/voting-sessions-controller";
import { VotingSession } from "../entities/voting-session";
import { listenerCount } from "process";

export const VotingTopicRoutes = (repository: VotingTopicRepository, sessionController: VotingSessionController) => {
    const router = Router();
    const parser = new VotingTopicJsonParser();
    const controller = new VotingTopicController(repository);

    router.get('/topic', async (req, res) => {
        const votingTopics = await controller.getActiveVotingTopics();
        res.status(200).send(
            votingTopics,
        );
    });

    router.get('/topic/all', async (req, res) => {
        const votingTopics = await controller.getActiveVotingTopics();
        res.status(200).send({
            votingTopics,
        });
    });

    router.get('/topic/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        const votingTopic = await controller.getVotingTopicById(id);
        if (!votingTopic) {
            res.status(404).send("Voting topic not found");
        }
        res.status(200).send(
            votingTopic
        );
    })

    router.get('/topic/:id/session', async (req, res) => {
        const id = parseInt(req.params.id);
        const votingTopic = controller.getVotingTopicById(id);
        const session = sessionController.getVotingSessionByTopicId(id);

        const queries = await Promise.all([votingTopic, session]);

        if (!queries[0]) {
            res.status(404).send("Voting topic not found");
        }

        let finalTopic = queries[0] as VotingTopic;
        const sessions = queries[1] as VotingSession[];

        if (finalTopic === undefined) {
            res.status(404).send("Voting topic not found");
        }
        finalTopic.sessions = sessions;

        res.status(200).send(
            finalTopic
        );
    })

    router.post('/topic', async (req, res) => {
        const votingTopic = parser.parse(req.body);
        const createdVotingTopic = await controller.createVotingTopic(votingTopic);

        if (!createdVotingTopic) {
            res.status(500).send("Error creating voting topic");
        }

        res.status(201).send({
            "votingTopic": (createdVotingTopic as VotingTopic),
        });
    });

    return router;
}