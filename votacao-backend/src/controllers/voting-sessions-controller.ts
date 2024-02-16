import { Repository } from "typeorm";
import { VotingSession } from "../entities/voting-session";
import { TypeORMDataSource } from "../repositories/typeorm/data-sources/typeorm-postgres-data-source";
import { VotingSessionSchema } from "../repositories/typeorm/schemas/voting-session-schema";
import { VotingSessionRepository } from "../repositories/interfaces/voting-session-repository";
import { VotingSessionPostData } from "../interfaces/voting-session-post-data";
import { VotingTopicController } from "./voting-topic-controller";
import { VotingTopic } from "../entities/voting-topic";
import { BadRequestError } from "../exceptions/bad-request-error";
import { ERROR_MESSAGES } from "../exceptions/erro-messages";

export class VotingSessionController {
    repository: VotingSessionRepository;

    constructor(repository: VotingSessionRepository) {
        this.repository = repository;
    }

    async createVotingSession(votingSessionData: VotingSessionPostData): Promise<VotingSession> {
        //to create a voting session the voting topic must be valid and can`t be another session active
        if (!votingSessionData.topicId) throw new BadRequestError(ERROR_MESSAGES.SESSION_NOT_FOUND);

        const sessions = await this.repository.getVotingSessionByTopicId(votingSessionData.topicId);

        if (sessions.length > 0) {
            const hasActiveSession = sessions.filter((session) => new Date(session.end_date.toString()) > new Date()).length > 0;
            if (hasActiveSession) throw new BadRequestError(ERROR_MESSAGES.ACTIVE_SESSION_FOUND);
        }

        const votingSession = VotingSession.create(VotingTopic.fromId(votingSessionData.topicId), votingSessionData.durationInMinutes);
        return this.repository.createVotingSession(votingSession);
    }

    async getActiveVotingSessions(): Promise<VotingSession[]> {
        return this.repository.getActiveVotingSessions();
    }

    async getVotingSessionById(id: number): Promise<VotingSession | undefined> {
        if (!id) throw new BadRequestError(ERROR_MESSAGES.SESSION_NOT_FOUND);
        return this.repository.getVotingSessionById(id);
    }

    async getVotingSessionByTopicId(topicId: number): Promise<VotingSession[]> {
        if (!topicId) throw new BadRequestError(ERROR_MESSAGES.SESSION_NOT_FOUND);
        return await this.repository.getVotingSessionByTopicId(topicId);
    };
}