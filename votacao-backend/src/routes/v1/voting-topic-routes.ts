import { Router } from "express";
import { VotingTopicController } from "../../controllers/voting-topic-controller";
import { VotingTopic } from "../../entities/voting-topic";
import { VotingTopicRepository } from "../../repositories/interfaces/voting-topic-repository";
import { VotingOption } from "../../entities/voting-options";
import { VotingSessionController } from "../../controllers/voting-sessions-controller";
import { VotingSession } from "../../entities/voting-session";
import { listenerCount } from "process";
import { VotingTopicPostData } from "../../interfaces/voting-topic-post-data";
import { TopicSearchData } from "../../interfaces/topic-search-data";
import { UserJWTMiddleware } from "../../middlewares/user-jwt-middleware";
import { AuthMiddleware } from "../../middlewares/auth-middleware";

export const VotingTopicRoutes = (repository: VotingTopicRepository, sessionController: VotingSessionController) => {
    const router = Router();
    const controller = new VotingTopicController(repository);

    router.get('/topic', UserJWTMiddleware, async (req, res) => {
        const search = req.query as unknown as TopicSearchData;
        let all = req.body["isAdmin"] === true;
        const votingTopics = await controller.getActiveVotingTopics(search, all);
        res.status(200).send(
            votingTopics,
        );
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

    //protected route
    router.post('/topic', AuthMiddleware, async (req, res) => {
        const votingTopic = req.body as VotingTopicPostData;
        const createdVotingTopic = await controller.createVotingTopic(votingTopic);

        if (!createdVotingTopic) {
            res.status(500).send("Error creating voting topic");
        }

        res.status(201).send({
            "topic": (createdVotingTopic as VotingTopic),
        });
    });

    return router;
}