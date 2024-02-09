import { EntitySchema } from "typeorm";
import { Vote } from "../../../entities/vote";
import { VotingTopicSchema } from "./voting-topic-schema";
import { UserSchema } from "./user-schema";

export const VoteSchema = new EntitySchema<Vote>({
    name: "vote",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: "increment"
        },
        vote: {
            type: "varchar",
        },
    },
    relations: {
        user: {
            target: "user",
            type: "many-to-one",
            joinColumn: { name: "user_id" },

        },
        topic: {
            target: "topic",
            type: "many-to-one",
            joinColumn: { name: "topic_id" },
        }
    }

});