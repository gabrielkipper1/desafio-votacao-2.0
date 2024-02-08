import { VotingSession } from "../../entities/voting-session";
import { VotingTopic } from "../../entities/voting-topic";
import { DataParser } from "../data-parser";
import { objectToMap } from "../map/map-parser";
import { VotingSessionJsonParser } from "./voting-session-json";

export class VotingTopicJsonParser implements DataParser<VotingTopic> {
    parse(data: any): VotingTopic {
        console.log("createVotingTopic", data);
        console.log("createVotingTopic", typeof data);

        if (!data) {
            throw new Error("Empty voting topic data");
        }

        if (typeof data === 'string') {
            data = JSON.parse(data);
        }

        if (typeof data === 'object' && data !== null) {
            data = objectToMap(data);
        }

        if (!(data instanceof Map)) {
            throw new Error("Invalid data");
        }

        if (data.get('id') !== undefined) {
            const sessions: VotingSession[] = data.get('sessions').map((session: any) => new VotingSessionJsonParser().parse(session));
            return VotingTopic.existing(data.get('id'), data.get('description'), data.get('category'), sessions);
        }
        return VotingTopic.create(data.get('description'), data.get('category'));
    }
    stringify(data: VotingTopic): string {
        return JSON.stringify(data);
    }
}