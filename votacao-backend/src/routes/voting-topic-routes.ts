import { Router } from "express";
import { VotingTopicJsonParser } from "../data-parsers/json/voting-topic-json-parser";
import { VotingTopicController } from "../controllers/voting-topic-controller";
import { VotingTopic } from "../entities/voting-topic";
import { VotingTopicRepository } from "../repositories/interfaces/voting-topic-repository";

export const VotingTopicRoutes = (repository: VotingTopicRepository) => {
    const router = Router();
    const parser = new VotingTopicJsonParser();
    const controller = new VotingTopicController(repository);

    router.get('/topic', async (req, res) => {
        const votingTopics = await controller.getActiveVotingTopics();
        res.status(200).send({
            "voting_topics": votingTopics,
        });
    });

    router.get('/topic/all', async (req, res) => {
        const votingTopics = await controller.getActiveVotingTopics();
        res.status(200).send({
            "voting_topics": votingTopics,
        });
    });


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