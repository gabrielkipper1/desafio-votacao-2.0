import { start } from "repl";
import { VotingTopic } from "./voting-topic";

export class VotingSession {
    id: number | undefined;
    topic: VotingTopic | undefined;
    start_date: Date;
    end_date: Date;

    private constructor(id: number | undefined, topic: VotingTopic | undefined, start_date: Date | undefined, end_date: Date | undefined) {
        if (!start_date || !end_date) {
            throw new Error('Invalid input values');
        }

        this.id = id;
        this.topic = topic;
        this.start_date = start_date;
        this.end_date = end_date
    }

    static create(topic: VotingTopic | undefined, durationInMinutes: number | undefined): VotingSession {
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
        if (!id || !topic) throw new Error('Invalid session Id');
        return new VotingSession(id, topic, start_date, end_date);
    }

    isActive(): boolean {
        const now = new Date();
        return now >= this.start_date && now <= this.end_date;
    }
}