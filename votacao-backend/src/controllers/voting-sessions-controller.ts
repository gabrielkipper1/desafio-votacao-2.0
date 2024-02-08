import { Repository } from "typeorm";
import { VotingSession } from "../entities/voting-session";
import { TypeORMDataSource } from "../repositories/typeorm/typeorm-postgres-data-source";
import { VotingSessionSchema } from "../repositories/typeorm/schemas/voting-session-schema";
import { VotingSessionRepository } from "../repositories/interfaces/voting-session-repository";

export class VotingSessionController {
    repository: VotingSessionRepository;

    constructor(repository: VotingSessionRepository) {
        this.repository = repository;
    }

    async createVotingSession(votingSession: VotingSession): Promise<VotingSession> {
        return this.repository.createVotingSession(votingSession);
    }

    async getActiveVotingSessions(): Promise<VotingSession[]> {
        return this.repository.getActiveVotingSessions();
    }

    async getVotingSessionById(id: number): Promise<VotingSession | undefined> {
        return this.repository.getVotingSessionById(id);
    }
}