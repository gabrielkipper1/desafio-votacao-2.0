import { User } from "./user";
import { VotingOption } from "./voting-options";
import { VotingTopic } from "./voting-topic";

export class Vote {
    user: User;
    topic: VotingTopic;
    vote: VotingOption;

    constructor(user: User | undefined, topic: VotingTopic | undefined, vote: VotingOption | undefined) {
        if (!user || !topic || !vote) {
            throw new Error('Invalid input values');
        }

        this.user = user;
        this.topic = topic;
        this.vote = vote;
    }
}