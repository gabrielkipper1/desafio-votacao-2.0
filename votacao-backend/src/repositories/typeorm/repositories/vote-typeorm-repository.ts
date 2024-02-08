import { Vote } from "../../../entities/vote";
import { VoteRepository } from "../../interfaces/vote-repository";
import { TypeORMDataSource } from "../typeorm-postgres-data-source";
import { VoteSchema } from "../schemas/vote-schema";

export class VoteTypeormRepository implements VoteRepository {
    repository = TypeORMDataSource.getRepository<Vote>(VoteSchema);

    async saveVote(vote: Vote) {
        return await this.repository.save(vote);
    }

    async getVotesFromTopic(topicId: number) {
        return await this.repository.find({ where: { id: topicId } });
    }
}