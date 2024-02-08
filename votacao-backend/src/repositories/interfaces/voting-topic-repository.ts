import { VotingTopic } from "../../entities/voting-topic";

export interface VotingTopicRepository {
    createVotingTopic(votingTopic: VotingTopic): Promise<VotingTopic>;
    getActiveVotingTopics(): Promise<VotingTopic[]>;
    getVotingTopicById(id: number): Promise<VotingTopic | undefined>;
}