import { EntitySchema } from "typeorm";
import { VotingSession } from "../../../../entities/voting-session";

export const VotingSessionSqliteSchema = new EntitySchema<VotingSession>({
    name: "session",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true
        },
        start_date: {
            type: "datetime"
        },
        end_date: {
            type: "datetime"
        },
    },
    relations: {
        topic: {
            target: "topic",
            type: "many-to-one",
            joinColumn: {
                name: "topic_id",
            },
        }
    }
});