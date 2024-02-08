import { VotingSession } from "../../src/entities/voting-session";
import { VotingSessionRepository } from "../../src/repositories/interfaces/voting-session-repository";

export class MockVotingSessionRepository implements VotingSessionRepository {
    private votingSessions: VotingSession[] = [];

    async createVotingSession(votingSession: VotingSession): Promise<VotingSession> {
        this.votingSessions.push(votingSession);
        return votingSession;
    }

    async getActiveVotingSessions(): Promise<VotingSession[]> {
        return this.votingSessions.filter(votingSession => votingSession.isActive());
    }

    async getVotingSessionById(voting_session_id: number): Promise<VotingSession | undefined> {
        return this.votingSessions.find(votingSession => votingSession.id === voting_session_id);
    }
}