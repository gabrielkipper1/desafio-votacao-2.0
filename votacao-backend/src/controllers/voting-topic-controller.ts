import { VotingSession } from "../entities/voting-session";
import { VotingTopic } from "../entities/voting-topic";
import { BadRequestError } from "../exceptions/bad-request-error";
import { ERROR_MESSAGES } from "../exceptions/erro-messages";
import { TopicSearchData } from "../interfaces/topic-search-data";
import { VotingTopicPostData } from "../interfaces/voting-topic-post-data";
import { VotingSessionRepository } from "../repositories/interfaces/voting-session-repository";
import { VotingTopicRepository } from "../repositories/interfaces/voting-topic-repository";
import { VotingSessionController } from "./voting-sessions-controller";

export class VotingTopicController {
    topicRepository: VotingTopicRepository;

    constructor(repository: VotingTopicRepository) {
        this.topicRepository = repository;
    }

    async createVotingTopic(votingTopicPostData: VotingTopicPostData): Promise<VotingTopic> {
        if (!votingTopicPostData.category || !votingTopicPostData.description) throw new BadRequestError(ERROR_MESSAGES.INVALID_TOPIC_DATA)

        const topic = VotingTopic.create(votingTopicPostData.description, votingTopicPostData.category);
        const session = VotingSession.withoutTopic(votingTopicPostData.durationInMinutes);
        topic.addSession(session);
        return await this.topicRepository.createVotingTopic(topic);
    }

    async getActiveVotingTopics(search: TopicSearchData, listAll: boolean): Promise<VotingTopic[]> {
        return await this.topicRepository.getActiveVotingTopics(search, listAll);
    }

    async getVotingTopicById(id: number): Promise<VotingTopic | undefined> {
        if (!id) throw new BadRequestError(ERROR_MESSAGES.VOTING_TOPIC_NOT_FOUND);
        return await this.topicRepository.getVotingTopicById(id);
    }
}