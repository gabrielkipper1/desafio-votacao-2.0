import { Entity, EntitySchema } from "typeorm";
import { User } from "../../../entities/user";
import { VoteSchema } from "./vote-schema";

export const UserSchema = new EntitySchema<User>({
    name: 'user',
    columns: {
        id: {
            type: String,
            primary: true
        },
        name: {
            type: String
        },
        email: {
            type: String
        },
        cpf: {
            type: String
        },
    },
    relations: {
        votes: {
            target: "vote",
            type: "one-to-many",
            inverseSide: "user"
        }
    }
});