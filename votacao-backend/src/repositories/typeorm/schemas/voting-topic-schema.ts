import { EntitySchema } from "typeorm";
import { VotingTopic } from "../../../entities/voting-topic";

export const VotingTopicSchema = new EntitySchema<VotingTopic>({
    name: "topic",
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true
        },
        description: {
            type: String,
            nullable: false
        },
        category: {
            type: String,
            nullable: false
        },
    },
    relations: {
        votes: {
            target: "vote",
            type: "one-to-many",
            inverseSide: "topic"
        },
        sessions: {
            target: "session",
            type: "one-to-many",
            inverseSide: "topic"
        }
    }
});
