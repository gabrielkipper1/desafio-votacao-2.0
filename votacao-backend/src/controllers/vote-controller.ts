import { Vote } from "../entities/vote";
import { VoteRepository } from "../repositories/interfaces/vote-repository";

export class VoteController {
    repository: VoteRepository;

    constructor(repository: VoteRepository) {
        this.repository = repository;
    }

    async createVote(vote: Vote): Promise<Vote | undefined> {
        return this.repository.saveVote(vote);
    }

    async getVotesByTopicId(vote_id: number): Promise<Vote[]> {
        return await this.repository.getVotesFromTopic(vote_id);
    }
}