import { Repository } from "typeorm";
import { VotingSession } from "../entities/voting-session";
import { TypeORMDataSource } from "../repositories/typeorm/data-sources/typeorm-postgres-data-source";
import { VotingSessionSchema } from "../repositories/typeorm/schemas/voting-session-schema";
import { VotingSessionRepository } from "../repositories/interfaces/voting-session-repository";
import { VotingSessionPostData } from "../interfaces/voting-session-post-data";
import { VotingTopicController } from "./voting-topic-controller";
import { VotingTopic } from "../entities/voting-topic";

export class VotingSessionController {
    repository: VotingSessionRepository;

    constructor(repository: VotingSessionRepository) {
        this.repository = repository;
    }

    async createVotingSession(votingSessionData: VotingSessionPostData): Promise<VotingSession> {
        const votingSession = VotingSession.create(VotingTopic.fromId(votingSessionData.topicId), votingSessionData.durationInMinutes);
        return this.repository.createVotingSession(votingSession);
    }

    async getActiveVotingSessions(): Promise<VotingSession[]> {
        return this.repository.getActiveVotingSessions();
    }

    async getVotingSessionById(id: number): Promise<VotingSession | undefined> {
        return this.repository.getVotingSessionById(id);
    }

    async getVotingSessionByTopicId(topicId: number): Promise<VotingSession[]> {
        return await this.repository.getVotingSessionByTopicId(topicId);
    };
}