import { Vote } from "../../entities/vote";

export interface VoteRepository {
    saveVote(vote: Vote): Promise<Vote | undefined>;
    getVotesFromTopic(topicId: number): Promise<Vote[] | undefined>;
}