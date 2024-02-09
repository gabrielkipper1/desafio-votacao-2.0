import { EntitySchema } from "typeorm";
import { VotingSession } from "../../../entities/voting-session";

export const VotingSessionSchema = new EntitySchema<VotingSession>({
    name: "session",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: "increment",
        },
        start_date: {
            type: "timestamp with time zone"
        },
        end_date: {
            type: "timestamp with time zone"
        },
    },
    relations: {
        topic: {
            target: "topic",
            type: "many-to-one",
            joinColumn: { name: "topic_id" },
        }
    }
});