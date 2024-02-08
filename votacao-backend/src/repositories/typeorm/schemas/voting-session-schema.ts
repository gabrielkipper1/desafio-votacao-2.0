import { EntitySchema } from "typeorm";
import { VotingSession } from "../../../entities/voting-session";

export const VotingSessionSchema = new EntitySchema<VotingSession>({
    name: "session",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true
        },
        start_date: {
            type: "timestamptz"
        },
        end_date: {
            type: "timestamptz"
        },
    },
    relations: {
        topic: {
            target: "topic",
            type: "many-to-one",
            joinColumn: true,
        }
    }
});