import { BadRequestError } from "../exceptions/bad-request-error";
import { ERROR_MESSAGES } from "../exceptions/erro-messages";
import { User } from "./user";
import { Vote } from "./vote";
import { VotingSession } from "./voting-session";

export class VotingTopic {
    id: number | undefined;
    description: string | undefined;
    category: string | undefined;
    votes: Map<number, Vote>;
    sessions: VotingSession[];

    private constructor(id: number | undefined, title: string | undefined, category: string | undefined, sessions: VotingSession[] | undefined) {
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
        if (!title || !category) {
            throw new BadRequestError(ERROR_MESSAGES.INVALID_TOPIC_DATA);
        }
        return new VotingTopic(undefined, title, category, undefined);
    }

    static existing(id: number | undefined, title: string | undefined, category: string | undefined, sessions: VotingSession[] | undefined): VotingTopic {
        if (!id) throw new BadRequestError(ERROR_MESSAGES.INVALID_TOPIC_DATA);

        if (!title || !category) {
            throw new BadRequestError(ERROR_MESSAGES.INVALID_TOPIC_DATA);
        }

        return new VotingTopic(id, title, category, sessions);
    }

    static fromId(id: number | undefined): VotingTopic {
        if (!id) throw new BadRequestError(ERROR_MESSAGES.INVALID_TOPIC_DATA);
        return new VotingTopic(id, '', '', undefined);
    }

    addVote(vote: Vote) {
        if (!vote.user.id) {
            throw new BadRequestError(ERROR_MESSAGES.INVALID_USER_ID);
        }

        if (this.votes.has(vote.user.id)) {
            throw new BadRequestError(ERROR_MESSAGES.USER_ALREADY_VOTED)
        }

        this.votes.set(vote.user.id, vote);
    }

    addSession(session: VotingSession) {
        if (this.sessions === undefined) {
            this.sessions = [];
        }
        this.sessions.push(session);
    }

    createSession(durationInMinutes: number) {
        const session = VotingSession.create(this, durationInMinutes);
        this.addSession(session);
    }

    isActive(): boolean {
        return this.sessions.length > 0 && this.sessions.some(session => session.isActive());
    }

}