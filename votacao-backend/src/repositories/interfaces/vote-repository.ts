import { Vote } from "../../entities/vote";
import { VotingResult } from "../../interfaces/voting-result";

export interface VoteRepository {
    saveVote(vote: Vote): Promise<Vote | undefined>;
    getVotesFromTopic(topicId: number): Promise<VotingResult[]>;
}