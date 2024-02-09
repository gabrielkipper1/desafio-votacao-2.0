import express, { Request, Response } from 'express';
import { DatabaseInitializer } from './settings/database-initializer';
import { UserRoutes } from './routes/user-routes';
import { VotingTopicRoutes } from './routes/voting-topic-routes';
import { UserTypeORMRepository } from './repositories/typeorm/repositories/user-typeorm-repository';
import { VotingTopicTypeormRepository } from './repositories/typeorm/repositories/voting-topic-typeorm-repository';
import { TypeORMDataSource } from './repositories/typeorm/data-sources/typeorm-postgres-data-source';
import { UserSchema } from './repositories/typeorm/schemas/user-schema';
import { User } from './entities/user';
import { VotingTopic } from './entities/voting-topic';
import { VotingTopicSchema } from './repositories/typeorm/schemas/voting-topic-schema';
import { VoteRoutes } from './routes/vote-routes';
import { VoteTypeormRepository } from './repositories/typeorm/repositories/vote-typeorm-repository';
import { VoteRepository } from './repositories/interfaces/vote-repository';
import { VoteSchema } from './repositories/typeorm/schemas/vote-schema';
import { Vote } from './entities/vote';
import { VotingSession } from './entities/voting-session';
import { VotingSessionSchema } from './repositories/typeorm/schemas/voting-session-schema';
import { VotingSessionTypeormRepository } from './repositories/typeorm/repositories/voting-session-typeorm-repository';
import { VotingSessionRoutes } from './routes/voting-session-routes';

const app = express();
const database = new DatabaseInitializer();
const port = process.env.PORT;

database.initialize();

app.use(express.json());
app.use('/', UserRoutes(new UserTypeORMRepository(TypeORMDataSource.getRepository<User>(UserSchema))));
app.use('/', VotingTopicRoutes(new VotingTopicTypeormRepository(TypeORMDataSource.getRepository<VotingTopic>(VotingTopicSchema))));
app.use('/', VoteRoutes(new VoteTypeormRepository(TypeORMDataSource.getRepository<Vote>(VoteSchema))));
app.use('/', VotingSessionRoutes(new VotingSessionTypeormRepository(TypeORMDataSource.getRepository<VotingSession>(VotingSessionSchema))));

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
