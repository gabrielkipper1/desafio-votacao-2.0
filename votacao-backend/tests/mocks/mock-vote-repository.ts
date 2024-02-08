import { Vote } from "../../src/entities/vote";
import { VoteRepository } from "../../src/repositories/interfaces/vote-repository";

export class MockVoteRepository implements VoteRepository {
    private votes: Vote[] = [];

    async saveVote(vote: Vote): Promise<Vote | undefined> {
        this.votes.push(vote);
        return vote;
    }

    async getVoteById(vote_id: number): Promise<Vote | undefined> {
        return this.votes.find(vote => vote.id === vote_id);
    }

    async getVotesFromTopic(topicId: number): Promise<Vote[] | undefined> {
        return this.votes.filter(vote => vote.topic.id === topicId);
    }
}