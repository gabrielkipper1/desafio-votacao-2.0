import express, { NextFunction, Request, Response } from 'express';
import { DatabaseInitializer } from './settings/database-initializer';
import { UserRoutes } from './routes/v1/user-routes';
import { VotingTopicRoutes } from './routes/v1/voting-topic-routes';
import { UserTypeORMRepository } from './repositories/typeorm/repositories/user-typeorm-repository';
import { VotingTopicTypeormRepository } from './repositories/typeorm/repositories/voting-topic-typeorm-repository';
import { TypeORMDataSource } from './repositories/typeorm/data-sources/typeorm-postgres-data-source';
import { UserSchema } from './repositories/typeorm/schemas/user-schema';
import { User } from './entities/user';
import { VotingTopic } from './entities/voting-topic';
import { VotingTopicSchema } from './repositories/typeorm/schemas/voting-topic-schema';
import { VoteRoutes } from './routes/v1/vote-routes';
import { VoteTypeormRepository } from './repositories/typeorm/repositories/vote-typeorm-repository';
import { VoteRepository } from './repositories/interfaces/vote-repository';
import { VoteSchema } from './repositories/typeorm/schemas/vote-schema';
import { Vote } from './entities/vote';
import { VotingSession } from './entities/voting-session';
import { VotingSessionSchema } from './repositories/typeorm/schemas/voting-session-schema';
import { VotingSessionTypeormRepository } from './repositories/typeorm/repositories/voting-session-typeorm-repository';
import { VotingSessionRoutes } from './routes/v1/voting-session-routes';
import { AuthRoutes } from './routes/v1/auth-routes';
import { AuthTypeORMRepository } from './repositories/typeorm/repositories/credentials-typeorm-repository';
import { UserPassword } from './entities/user-password';
import { UserPasswordSchema } from './repositories/typeorm/schemas/credential-schema';
import { BCryptPasswordEncoder } from './data-parsers/credentials/bcrypt-password-encoder';
import { JWTEncoder } from './data-parsers/credentials/jwt-encoder';
import { TokenController } from './controllers/token-controller';
import { UserController } from './controllers/user-controller';
import { PasswordController } from './controllers/password-controller';
import cors from 'cors';
import { VotingSessionController } from './controllers/voting-sessions-controller';
import { UserAdminController } from './controllers/user-admin-controller';
import { UserAdmin } from './entities/user-admin';
import { AdminSchema } from './repositories/typeorm/schemas/admin-schema';
import { UserAdminTypeOrmRepository } from './repositories/typeorm/repositories/user-admin-typeorm-repository';
import "express-async-errors";
import { errorHandler } from './middlewares/error-middleware';

const app = express();
const database = new DatabaseInitializer();
const port = process.env.PORT;

database.initialize();

app.use(cors())
app.use(express.json());


//this would be replaced by a dependency injection container
//but then it`s going to take a long time to implement
const userRespository = new UserTypeORMRepository(TypeORMDataSource.getRepository<User>(UserSchema));
const votingTopicRepository = new VotingTopicTypeormRepository(TypeORMDataSource.getRepository<VotingTopic>(VotingTopicSchema));
const voteRepository = new VoteTypeormRepository(TypeORMDataSource.getRepository<Vote>(VoteSchema));
const votingSessionRepository = new VotingSessionTypeormRepository(TypeORMDataSource.getRepository<VotingSession>(VotingSessionSchema));
const userAdminRepository = new UserAdminTypeOrmRepository(TypeORMDataSource.getRepository<UserAdmin>(AdminSchema));
const userPasswordRepository = new AuthTypeORMRepository(TypeORMDataSource.getRepository<UserPassword>(UserPasswordSchema));
const tokenEncoder = new JWTEncoder();
const passwordEncoder = new BCryptPasswordEncoder();

app.use('/api/v1', UserRoutes(userRespository));
app.use('/api/v1', VotingTopicRoutes(votingTopicRepository, new VotingSessionController(votingSessionRepository)));
app.use('/api/v1', VoteRoutes(voteRepository));
app.use('/api/v1', VotingSessionRoutes(votingSessionRepository));
app.use('/api/v1', AuthRoutes(
    new TokenController(tokenEncoder),
    new UserController(userRespository),
    new PasswordController(userPasswordRepository, passwordEncoder),
    new UserAdminController(userAdminRepository),
));

app.use(errorHandler);
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
