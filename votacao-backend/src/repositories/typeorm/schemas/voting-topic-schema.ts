import { EntitySchema } from "typeorm";
import { VotingTopic } from "../../../entities/voting-topic";

export const VotingTopicSchema = new EntitySchema<VotingTopic>({
    name: "topic",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: "increment"
        },
        description: {
            type: "varchar",
            nullable: false
        },
        category: {
            type: "varchar",
            nullable: false
        },
    },
    relations: {
        votes: {
            target: "vote",
            type: "one-to-many",
            inverseSide: "topic",
            joinColumn: { name: "vote_id" }
        },
        sessions: {
            cascade: ["insert"],
            target: "session",
            type: "one-to-many",
            inverseSide: "topic",
            joinColumn: { name: "session_id" }
        }
    }
});
