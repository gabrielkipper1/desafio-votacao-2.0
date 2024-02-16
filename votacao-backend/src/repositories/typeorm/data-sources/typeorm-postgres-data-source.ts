import { UserSchema } from "../schemas/user-schema";
import "reflect-metadata"
import { DataSource } from "typeorm/data-source/DataSource";
import { CreateUserTable1707265027687 } from "../migrations/1707265027687-create-user-table";
import { CreateVoteTable1707276296151 } from "../migrations/1707276296151-create-vote-table";
import { CreateVotingTopicTable1707276311154 } from "../migrations/1707276311154-create-voting-topic-table";
import { env } from "node:process";
import { CreateVotingSessionTable1707312453667 } from "../migrations/1707312453667-create-voting-session-table";
import { CreateUserAdminTable1707315160933 } from "../migrations/1707315160933-create-user-admin-table";
import { VotingTopicSchema } from "../schemas/voting-topic-schema";
import { VotingSessionSchema } from "../schemas/voting-session-schema";
import { VoteSchema } from "../schemas/vote-schema";
import { CreateDatabase1707349833140 } from "../migrations/1707349833140-create-database";
import { CreateCredentialsTable1707487847662 } from "../migrations/1707487847662-create-credentials-table";
import { UserPasswordSchema } from "../schemas/credential-schema";
import { UserAdmin } from "../../../entities/user-admin";
import { AdminSchema } from "../schemas/admin-schema";
import { CreateAdminUser1708009291294 } from "../migrations/1708009291294-create-admin-user";

require('dotenv').config();

export const TypeORMDataSource = new DataSource({
    type: process.env.TYPEORM_DB_TYPE as any,
    host: process.env.TYPEORM_DB_HOST,
    port: 5432,
    username: process.env.TYPEORM_DB_USERNAME,
    password: process.env.TYPEORM_DB_PASSWORD,
    database: process.env.TYPEORM_DB_NAME,
    synchronize: false,
    logging: true,
    migrationsRun: true,
    entities: [
        UserSchema,
        VotingTopicSchema,
        VotingSessionSchema,
        VoteSchema,
        UserPasswordSchema,
        AdminSchema
    ],
    subscribers: [],
    migrationsTransactionMode: "each",
    migrations: [
        CreateUserTable1707265027687,
        CreateVoteTable1707276296151,
        CreateVotingTopicTable1707276311154,
        CreateVotingSessionTable1707312453667,
        CreateCredentialsTable1707487847662,
        CreateUserAdminTable1707315160933,
        CreateAdminUser1708009291294
    ],
})