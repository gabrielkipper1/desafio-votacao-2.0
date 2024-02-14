import { Vote } from "../../src/entities/vote";
import { VotingResult } from "../../src/interfaces/voting-result";
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

    async getVotesFromTopic(topicId: number): Promise<VotingResult[]> {
        return this.votes.filter(vote => vote.topic.id === topicId).map(vote => {
            return {
                option: vote.vote,
                votes: this.votes.filter(v => v.vote === vote.vote).length
            };
        });
    }
    async hasUserVoted(topicId: number, userId: number): Promise<boolean> {
        return this.votes.filter(vote => vote.topic.id === topicId && vote.user.id === userId).length > 0;
    }
}