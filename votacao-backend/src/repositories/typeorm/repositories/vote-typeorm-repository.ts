import { Vote } from "../../../entities/vote";
import { VotingResult } from "../../../interfaces/voting-result";
import { VoteRepository } from "../../interfaces/vote-repository";
import { TypeORMDataSource } from "../data-sources/typeorm-postgres-data-source";
import { VoteSchema } from "../schemas/vote-schema";
import { Repository } from "typeorm";

export class VoteTypeormRepository implements VoteRepository {
    repository: Repository<Vote>;

    constructor(repository: Repository<Vote>) {
        this.repository = repository;
    }

    async getVoteById(voteId: number) {
        return await this.repository.findOne({ where: { id: voteId } });
    }

    async saveVote(vote: Vote) {
        return await this.repository.save(vote);
    }

    async getVotesFromTopic(topicId: number): Promise<VotingResult[]> {
        const result = await this.repository.createQueryBuilder("vote").
            select(["vote.vote as option", "count(vote.vote) as votes"]).
            where("vote.topic_id = :topicId", { topicId: topicId }).
            groupBy("vote.vote").
            getRawMany();
        return result as VotingResult[];
    };
}