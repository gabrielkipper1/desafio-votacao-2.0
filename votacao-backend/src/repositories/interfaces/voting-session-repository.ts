import { VotingSession } from "../../entities/voting-session";

export interface VotingSessionRepository {
    createVotingSession(votingSession: VotingSession): Promise<VotingSession>;
    getActiveVotingSessions(): Promise<VotingSession[]>;
    getVotingSessionById(id: number): Promise<VotingSession | undefined>;
}