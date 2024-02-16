import { FindManyOptions, FindOptionsWhere, ILike, MoreThan, Repository } from "typeorm";
import { VotingTopic } from "../../../entities/voting-topic";
import { TypeORMDataSource } from "../data-sources/typeorm-postgres-data-source";
import { VotingTopicSchema } from "../schemas/voting-topic-schema";
import { VotingTopicRepository } from "../../interfaces/voting-topic-repository";
import { TopicSearchData } from "../../../interfaces/topic-search-data";

export class VotingTopicTypeormRepository implements VotingTopicRepository {
    repository: Repository<VotingTopic>;

    constructor(repository: Repository<VotingTopic>) {
        this.repository = repository;
    }

    async createVotingTopic(votingTopic: VotingTopic): Promise<VotingTopic> {
        return this.repository.save(votingTopic);
    }

    async getActiveVotingTopics(search: TopicSearchData, listAll: boolean): Promise<VotingTopic[]> {
        //if listAll is true, we want to list all topics, otherwise we want to list only the active ones
        const params: FindOptionsWhere<VotingTopic> = {
            category: ILike(`%${search.category || ""}%`)
        };

        if (!listAll) {
            params.sessions = {
                end_date: MoreThan(new Date())
            }
        }

        return this.repository.find({
            where: params,
            order: {
                id: "DESC"
            }
        });
    }

    async getVotingTopicById(id: number): Promise<VotingTopic | undefined> {
        const topic = await this.repository.findOneBy({ id: id });
        if (!topic) return undefined; //typescript works with undefined, not null
        return topic;
    }
}