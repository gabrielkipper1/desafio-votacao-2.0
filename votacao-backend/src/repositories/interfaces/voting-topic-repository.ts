import { VotingTopic } from "../../entities/voting-topic";
import { TopicSearchData } from "../../interfaces/topic-search-data";
import { VotingTopicPostData } from "../../interfaces/voting-topic-post-data";

export interface VotingTopicRepository {
    createVotingTopic(votingTopic: VotingTopic): Promise<VotingTopic>;
    getActiveVotingTopics(search: TopicSearchData, listAll: boolean): Promise<VotingTopic[]>;
    getVotingTopicById(id: number): Promise<VotingTopic | undefined>;
}