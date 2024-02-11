import { EntitySchema } from "typeorm/entity-schema/EntitySchema";
import { UserPassword } from "../../../entities/user-password";

export const UserPasswordSchema = new EntitySchema<UserPassword>({
    name: "credential",
    columns: {
        password: {
            type: "varchar",
            nullable: false,
        },

        userId: {
            name: "user_id",
            type: "integer",
            primary: true,
            nullable: false,
        }
    },
});