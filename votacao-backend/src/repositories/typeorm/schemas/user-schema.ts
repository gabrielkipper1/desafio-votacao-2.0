import { Entity, EntitySchema } from "typeorm";
import { User } from "../../../entities/user";
import { VoteSchema } from "./vote-schema";

export const UserSchema = new EntitySchema<User>({
    name: 'user',
    columns: {
        id: {
            type: "integer",
            primary: true,
            generated: "increment",
        },
        name: {
            type: "varchar",
            nullable: false,
        },
        email: {
            type: "varchar",
            nullable: false,
        },
        cpf: {
            type: "varchar",
            nullable: false,
        },
    },

    relations: {
        votes: {
            target: "vote",
            type: "one-to-many",
            inverseSide: "user",
            joinColumn: { name: "vote_id" },
        }
    }
});