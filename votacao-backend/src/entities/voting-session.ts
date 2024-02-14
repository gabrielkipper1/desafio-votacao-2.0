import { start } from "repl";
import { VotingTopic } from "./voting-topic";
import { BadRequestError } from "../exceptions/bad-request-error";
import { ERROR_MESSAGES } from "../exceptions/erro-messages";

export class VotingSession {
    id: number | undefined;
    topic: VotingTopic | undefined;
    start_date: Date;
    end_date: Date;

    private constructor(id: number | undefined, topic: VotingTopic | undefined, start_date: Date | undefined, end_date: Date | undefined) {
        if (!start_date || !end_date) {
            throw new BadRequestError(ERROR_MESSAGES.INVALID_DATA);;
        }

        this.id = id;
        this.topic = topic;
        this.start_date = start_date;
        this.end_date = end_date
    }

    static create(topic: VotingTopic | undefined, durationInMinutes: number | undefined): VotingSession {
        if (!topic) throw new BadRequestError(ERROR_MESSAGES.INVALID_DATA);
        const startDate = new Date();
        const endDate = new Date(startDate.getTime() + (durationInMinutes || 1) * 60000);
        return new VotingSession(undefined, topic, startDate, endDate);
    }

    static withoutTopic(durationInMinutes: number | undefined): VotingSession {
        const startDate = new Date();
        const endDate = new Date(startDate.getTime() + (durationInMinutes || 1) * 60000);
        return new VotingSession(undefined, undefined, startDate, endDate);
    }

    static existing(id: number | undefined, topic: VotingTopic | undefined, start_date: Date | undefined, end_date: Date | undefined): VotingSession {
        if (!id || !topic) throw new BadRequestError(ERROR_MESSAGES.INVALID_DATA);
        return new VotingSession(id, topic, start_date, end_date);
    }

    isActive(): boolean {
        const now = new Date();
        return now >= this.start_date && now <= this.end_date;
    }
}