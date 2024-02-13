import { VotingOption } from "./voting-option";

export interface VotePostData {
    topicId: number;
    cpf: string;
    vote: VotingOption;
}