import { Repository } from "typeorm/repository/Repository";
import { VotingSession } from "../../../entities/voting-session";
import { TypeORMDataSource } from "../data-sources/typeorm-postgres-data-source";
import { VotingSessionSchema } from "../schemas/voting-session-schema";
import { VotingSessionRepository } from "../../interfaces/voting-session-repository";
import { VotingSessionPostData } from "../../../interfaces/voting-session-post-data";

export class VotingSessionTypeormRepository implements VotingSessionRepository {
    repository: Repository<VotingSession>;

    constructor(repository: Repository<VotingSession>) {
        this.repository = repository;
    }

    async getVotingSessionByTopicId(topicId: number): Promise<VotingSession[]> {
        const result = await this.repository.find({ where: { topic: { id: topicId } } });
        return result;
    }

    async getVotingSessionById(id: number): Promise<VotingSession | undefined> {
        const result = await this.repository.findOne({ where: { id: id } });
        if (result === null) return undefined;
        return result;
    }

    async createVotingSession(votingSession: VotingSession): Promise<VotingSession> {
        return await this.repository.save(votingSession);
    }

    async getActiveVotingSessions(): Promise<VotingSession[]> {
        //return await this.repository.find({ where: { active: true } });
        return [];
    }
}