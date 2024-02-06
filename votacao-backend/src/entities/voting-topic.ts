import { User } from "./user";
import { Vote } from "./vote";

export class VotingTopic {
    title: string;
    votes: Map<string, Vote>;

    constructor(title: string | undefined) {
        if (!title) {
            throw new Error('Invalid input values');
        }

        this.title = title;
        this.votes = new Map();
    }

    addVote(vote: Vote) {
        this.votes.set(vote.user.uid, vote);
    }

}