import { Vote } from "../../../entities/vote";
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

    async getVotesFromTopic(topicId: number) {
        return await this.repository.find({
            where: {
                topic: {
                    id: topicId
                }
            }
        });
    }
}