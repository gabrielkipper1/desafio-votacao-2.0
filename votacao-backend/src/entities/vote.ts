import { User } from "./user";
import { VotingOption } from "./voting-options";
import { VotingTopic } from "./voting-topic";

export class Vote {
    id: number | undefined;
    user: User;
    topic: VotingTopic;
    vote: VotingOption;

    private constructor(id: number | undefined, user: User | undefined, topic: VotingTopic | undefined, vote: VotingOption | undefined) {
        if (!user || !topic || !vote) {
            throw new Error('Invalid input values');
        }

        this.id = id;
        this.user = user;
        this.topic = topic;
        this.vote = vote;
    }

    static create(user: User | undefined, topic: VotingTopic | undefined, vote: VotingOption | undefined): Vote {
        return new Vote(undefined, user, topic, vote);
    }

    static existing(id: number | undefined, user: User | undefined, topic: VotingTopic | undefined, vote: VotingOption | undefined): Vote {
        if (!id) throw new Error('Invalid vote Id');
        return new Vote(id, user, topic, vote);
    }
}