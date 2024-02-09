import { Repository } from "typeorm";
import { VotingTopic } from "../../../entities/voting-topic";
import { TypeORMDataSource } from "../data-sources/typeorm-postgres-data-source";
import { VotingTopicSchema } from "../schemas/voting-topic-schema";
import { VotingTopicRepository } from "../../interfaces/voting-topic-repository";

export class VotingTopicTypeormRepository implements VotingTopicRepository {
    repository: Repository<VotingTopic>;

    constructor(repository: Repository<VotingTopic>) {
        this.repository = repository;
    }

    async createVotingTopic(votingTopic: VotingTopic): Promise<VotingTopic> {
        return this.repository.save(votingTopic);
    }

    async getActiveVotingTopics(): Promise<VotingTopic[]> {
        //return this.repository.find({ where: { : true } });
        return [];
    }

    async getVotingTopicById(id: number): Promise<VotingTopic | undefined> {
        const topic = await this.repository.findOneBy({ id: id });
        if (!topic) return undefined; //typescript works with undefined, not null
        return topic;
    }
}