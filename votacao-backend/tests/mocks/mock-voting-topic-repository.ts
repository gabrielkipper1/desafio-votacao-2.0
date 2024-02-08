import { VotingTopic } from "../../src/entities/voting-topic";
import { VotingTopicRepository } from "../../src/repositories/interfaces/voting-topic-repository";

export class MockVotingTopicRepository implements VotingTopicRepository {

    private votingTopics: VotingTopic[] = [];

    async createVotingTopic(votingTopic: VotingTopic): Promise<VotingTopic> {
        this.votingTopics.push(votingTopic);
        return votingTopic;
    }

    async getActiveVotingTopics(): Promise<VotingTopic[]> {
        return this.votingTopics.filter(votingTopic => votingTopic.isActive());
    }

    async getVotingTopicById(topicId: number): Promise<VotingTopic | undefined> {
        const topicFound = this.votingTopics.find(votingTopic => votingTopic.id === topicId);
        return topicFound;
    }
}