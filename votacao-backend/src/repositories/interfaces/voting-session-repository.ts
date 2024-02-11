import { VotingSession } from "../../entities/voting-session";
import { VotingSessionPostData } from "../../interfaces/voting-session-post-data";

export interface VotingSessionRepository {
    createVotingSession(votingSession: VotingSession): Promise<VotingSession>;
    getActiveVotingSessions(): Promise<VotingSession[]>;
    getVotingSessionById(id: number): Promise<VotingSession | undefined>;
    getVotingSessionByTopicId(topicId: number): Promise<VotingSession[]>;
}