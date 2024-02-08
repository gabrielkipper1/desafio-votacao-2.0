import { VotingSession } from "../../entities/voting-session";
import { VotingTopic } from "../../entities/voting-topic";
import { DataParser } from "../data-parser";
import { objectToMap } from "../map/map-parser";
import { VotingTopicJsonParser } from "./voting-topic-json-parser";

export class VotingSessionJsonParser implements DataParser<VotingSession> {
    parse(data: any): VotingSession {
        if (!data) {
            throw new Error("Empty session data");
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
            const votingTopic = new VotingTopicJsonParser().parse(data.get('topic'));
            return VotingSession.existing(data.get('id'), votingTopic, data.get('start'), data.get('end'));
        }
        return VotingSession.create(data.get('topicId'), data.get('durationInMinutes'));
    }

    stringify(data: VotingSession): string {
        return JSON.stringify(data);
    }
}