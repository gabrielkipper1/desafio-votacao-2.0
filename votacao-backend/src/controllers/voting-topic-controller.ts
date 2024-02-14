import { VotingSession } from "../entities/voting-session";
import { VotingTopic } from "../entities/voting-topic";
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
        const topic = VotingTopic.create(votingTopicPostData.description, votingTopicPostData.category);
        const session = VotingSession.withoutTopic(votingTopicPostData.durationInMinutes);
        topic.addSession(session);
        return await this.topicRepository.createVotingTopic(topic);
    }

    async getActiveVotingTopics(search: TopicSearchData): Promise<VotingTopic[]> {
        return await this.topicRepository.getActiveVotingTopics(search);
    }

    async getVotingTopicById(id: number): Promise<VotingTopic | undefined> {
        return await this.topicRepository.getVotingTopicById(id);
    }
}