import { VotingOption } from "../entities/voting-options";

export interface VotePostData {
    topicId: number;
    userId: number;
    vote: VotingOption;
}