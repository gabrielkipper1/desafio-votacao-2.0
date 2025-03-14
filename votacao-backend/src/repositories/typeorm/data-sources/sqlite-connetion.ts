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
import { VotingSessionSqliteSchema } from "../sqlite/schemas-override/voting-session-sqlite-schema";
import { CreateVotingSessionTable1707436284940 } from "../sqlite/migration-override/1707436284940-create-sqlite-voting-session-table";

export const SqliteDataSource = new DataSource({
    type: "sqlite",
    database: ":memory:",
    synchronize: false,
    logging: false,
    migrationsRun: true,
    entities: [
        UserSchema,
        VotingTopicSchema,
        VotingSessionSqliteSchema,
        VoteSchema
    ],
    subscribers: [],
    migrations: [
        CreateDatabase1707349833140,
        CreateUserTable1707265027687,
        CreateVoteTable1707276296151,
        CreateVotingTopicTable1707276311154,
        CreateVotingSessionTable1707436284940,
        CreateUserAdminTable1707315160933
    ],
})