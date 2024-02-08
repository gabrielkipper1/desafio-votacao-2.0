import { User } from "./user";
import { Vote } from "./vote";
import { VotingSession } from "./voting-session";

export class VotingTopic {
    id: number | undefined;
    description: string;
    category: string;
    votes: Map<number, Vote>;
    sessions: VotingSession[];

    private constructor(id: number | undefined, title: string | undefined, category: string | undefined, sessions: VotingSession[] | undefined) {
        if (!title || !category) {
            throw new Error('Invalid input values');
        }

        if (!sessions) {
            sessions = [];
        }

        this.id = id;
        this.description = title;
        this.category = category;
        this.votes = new Map();
        this.sessions = sessions;
    }

    static create(title: string | undefined, category: string | undefined): VotingTopic {
        return new VotingTopic(undefined, title, category, undefined);
    }

    static existing(id: number | undefined, title: string | undefined, category: string | undefined, sessions: VotingSession[] | undefined): VotingTopic {
        if (!id) throw new Error('Invalid topic Id');
        return new VotingTopic(id, title, category, sessions);
    }

    addVote(vote: Vote) {
        if (!vote.user.id) {
            throw new Error('Invalid user values');
        }

        if (this.votes.has(vote.user.id)) {
            throw new Error('User cannot vote twice on same topic');
        }

        this.votes.set(vote.user.id, vote);
    }

    addSession(session: VotingSession) {
        this.sessions.push(session);
    }

    createSession(durationInMinutes: number) {
        const session = VotingSession.create(this, durationInMinutes);
        this.addSession(session);
    }

    isActive(): boolean {
        //check if has sessions and if start time and end time are in range compared to current time
        return this.sessions.length > 0 && this.sessions.some(session => session.isActive());
    }

}