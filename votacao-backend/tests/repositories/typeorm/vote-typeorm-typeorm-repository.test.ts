import { DataSource } from "typeorm";
import { VoteRepository } from "../../../src/repositories/interfaces/vote-repository";
import { SqliteDataSource } from "../../../src/repositories/typeorm/data-sources/sqlite-connetion";
import { VoteTypeormRepository } from "../../../src/repositories/typeorm/repositories/vote-typeorm-repository";
import { Vote } from "../../../src/entities/vote";
import { VoteSchema } from "../../../src/repositories/typeorm/schemas/vote-schema";
import { User } from "../../../src/entities/user";
import { VotingTopic } from "../../../src/entities/voting-topic";
import { VotingOption } from "../../../src/entities/voting-options";
import { VotingSession } from "../../../src/entities/voting-session";
import { VotingTopicSchema } from "../../../src/repositories/typeorm/schemas/voting-topic-schema";
import { VotingTopicTypeormRepository } from "../../../src/repositories/typeorm/repositories/voting-topic-typeorm-repository";
import { VotingSessionTypeormRepository } from "../../../src/repositories/typeorm/repositories/voting-session-typeorm-repository";
import { VotingTopicRepository } from "../../../src/repositories/interfaces/voting-topic-repository";
import { VotingSessionRepository } from "../../../src/repositories/interfaces/voting-session-repository";
import { UserRepository } from "../../../src/repositories/interfaces/user-repository";
import { UserSchema } from "../../../src/repositories/typeorm/schemas/user-schema";
import { UserTypeORMRepository } from "../../../src/repositories/typeorm/repositories/user-typeorm-repository";
import { VotingSessionSqliteSchema } from "../../../src/repositories/typeorm/sqlite/schemas-override/voting-session-sqlite-schema";

let dataSource: DataSource;
let topicRepository: VotingTopicRepository;
let sessionRepository: VotingSessionRepository;
let userRepository: UserRepository;
let repository: VoteRepository;


beforeAll(async () => {
    dataSource = await SqliteDataSource.initialize();
    repository = new VoteTypeormRepository(SqliteDataSource.getRepository<Vote>(VoteSchema));
    topicRepository = new VotingTopicTypeormRepository(SqliteDataSource.getRepository<VotingTopic>(VotingTopicSchema));
    userRepository = new UserTypeORMRepository(SqliteDataSource.getRepository<User>(UserSchema));
    sessionRepository = new VotingSessionTypeormRepository(SqliteDataSource.getRepository<VotingSession>(VotingSessionSqliteSchema));
});

afterAll(async () => {
    dataSource.destroy();
});

describe('VoteTypeORMRepository', () => {
    it('should create a new vote', async () => {
        const user = await userRepository.saveUser(User.create("Foo User", "foo@test.com", "1234"));
        const topic = await topicRepository.createVotingTopic(VotingTopic.create("Foo Topic", "Foo description"));
        const vote = await repository.saveVote(Vote.create(user, topic, VotingOption.NO));
        expect(vote).toBeInstanceOf(Vote);
    });

    it('should get a all votes from a topic', async () => {
        const votes = await repository.getVotesFromTopic(1);
        expect(votes?.length).toBe(1);
    });

    it("should add votes from different users", async () => {
        const fooUser = await userRepository.saveUser(User.create("Foo User", "foo@test.com", "1234"));
        const barUser = await userRepository.saveUser(User.create("Bar User", "bar@test.com", "abcd"));
        const topic = await topicRepository.createVotingTopic(VotingTopic.create("Foo Topic", "Foo description"));

        await repository.saveVote(Vote.create(fooUser, topic, VotingOption.NO));
        await repository.saveVote(Vote.create(barUser, topic, VotingOption.YES));

        expect((await repository.getVotesFromTopic(topic.id as number))?.length).toBe(2);
    });

    it("should return empty array if no votes are found", async () => {
        const votes = await repository.getVotesFromTopic(9999);
        expect(votes?.length).toBe(0);
    });
});