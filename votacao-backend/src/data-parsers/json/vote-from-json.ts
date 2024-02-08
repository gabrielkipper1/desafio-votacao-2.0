import { Vote } from "../../entities/vote";
import { DataParser } from "../data-parser";
import { objectToMap } from "../map/map-parser";
import { UserJsonParser } from "./user-from-json";
import { VotingTopicJsonParser } from "./voting-topic-json-parser";

export class VoteJsonParser implements DataParser<Vote> {
    parse(data: any): Vote {
        if (!data) {
            throw new Error("Empty vote data");
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

        const topic = data.get('topic').map((topic: any) => new VotingTopicJsonParser().parse(topic));
        const user = data.get('user').map((user: any) => new UserJsonParser().parse(user));

        if (data.get('id') !== undefined) {
            return Vote.existing(data.get('id'), topic, user, data.get('vote'));
        }

        return Vote.create(user, topic, data.get('vote'));
    }
    stringify(data: Vote): string {
        return JSON.stringify(data);
    }

}