import { EntitySchema } from "typeorm/entity-schema/EntitySchema";
import { UserPassword } from "../../../entities/user-password";
import { Admin } from "typeorm";
import { UserAdmin } from "../../../entities/user-admin";

export const AdminSchema = new EntitySchema<UserAdmin>({
    name: "credential",
    columns: {
        active: {
            type: "boolean",
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