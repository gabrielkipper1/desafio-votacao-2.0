import { User } from "../entities/user";
import { Vote } from "../entities/vote";
import { VotingTopic } from "../entities/voting-topic";
import { VotePostData } from "../interfaces/vote-post-data";
import { VotingResult } from "../interfaces/voting-result";
import { VoteRepository } from "../repositories/interfaces/vote-repository";

export class VoteController {
    repository: VoteRepository;

    constructor(repository: VoteRepository) {
        this.repository = repository;
    }

    async createVote(votePostData: VotePostData): Promise<Vote | undefined> {
        const vote = Vote.create(User.fromId(votePostData.userId), VotingTopic.fromId(votePostData.topicId), votePostData.vote);
        return this.repository.saveVote(vote);
    }

    async getVotesByTopicId(topic_id: number): Promise<VotingResult[]> {
        if (!topic_id) throw new Error("Topic ID is required");

        const topicIdNum = Number(topic_id);
        if (isNaN(topicIdNum)) throw new Error("Invalid topic ID");

        return await this.repository.getVotesFromTopic(topicIdNum);
    }
}