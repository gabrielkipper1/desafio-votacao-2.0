import { VotingTopic } from "../entities/voting-topic";
import { VotingTopicRepository } from "../repositories/interfaces/voting-topic-repository";

export class VotingTopicController {
    repository: VotingTopicRepository;

    constructor(repository: VotingTopicRepository) {
        this.repository = repository;
    }

    async createVotingTopic(votingTopic: VotingTopic): Promise<VotingTopic> {
        return this.repository.createVotingTopic(votingTopic);
    }

    async getActiveVotingTopics(): Promise<VotingTopic[]> {
        return await this.repository.getActiveVotingTopics();
    }

    async getVotingTopicById(id: number): Promise<VotingTopic | undefined> {
        return await this.repository.getVotingTopicById(id);
    }
}