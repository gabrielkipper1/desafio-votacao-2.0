import { VotingOption } from "../entities/voting-options";

export interface VotePostData {
    topicId: number;
    cpf: string;
    vote: VotingOption;
}