import { DataSource } from "typeorm";
import { VotingSessionRepository } from "../../../src/repositories/interfaces/voting-session-repository";
import { SqliteDataSource } from "../../../src/repositories/typeorm/data-sources/sqlite-connetion";
import { VotingSessionTypeormRepository } from "../../../src/repositories/typeorm/repositories/voting-session-typeorm-repository";
import { VotingSession } from "../../../src/entities/voting-session";
import { VotingSessionSchema } from "../../../src/repositories/typeorm/schemas/voting-session-schema";
import { VotingTopic } from "../../../src/entities/voting-topic";
import { VotingTopicRepository } from "../../../src/repositories/interfaces/voting-topic-repository";
import { VotingTopicTypeormRepository } from "../../../src/repositories/typeorm/repositories/voting-topic-typeorm-repository";
import { VotingTopicSchema } from "../../../src/repositories/typeorm/schemas/voting-topic-schema";
import { VotingSessionSqliteSchema } from "../../../src/repositories/typeorm/sqlite/schemas-override/voting-session-sqlite-schema";

let dataSource: DataSource;
let repository: VotingSessionRepository;
let topicRepository: VotingTopicRepository;

beforeAll(async () => {
    dataSource = await SqliteDataSource.initialize();
    repository = new VotingSessionTypeormRepository(SqliteDataSource.getRepository<VotingSession>(VotingSessionSqliteSchema));
    topicRepository = new VotingTopicTypeormRepository(SqliteDataSource.getRepository<VotingTopic>(VotingTopicSchema));
});

afterAll(async () => {
    dataSource.destroy();
});

describe('VotingSessionTypeORMRepository', () => {
    it("should create a new voting session", async () => {
        const topic = await topicRepository.createVotingTopic(VotingTopic.create("Foo Topic", "Foo description"));
        const session = VotingSession.create(topic, 10);
        const savedVotingSession = await repository.createVotingSession(session);
        expect(savedVotingSession).toBeInstanceOf(VotingSession);
    });

    it("should get a voting session by id", async () => {
        const topic = await topicRepository.createVotingTopic(VotingTopic.create("Foo Topic", "Foo description"));
        const votingSession = VotingSession.create(topic, 10);
        const savedVotingSession = await repository.createVotingSession(votingSession);
        const foundVotingSession = await repository.getVotingSessionById(savedVotingSession.id as number);
        expect(foundVotingSession?.id).toEqual(savedVotingSession.id);
    });

    it("should get a voting sessions by topic", async () => {
        const topic = await topicRepository.createVotingTopic(VotingTopic.create("Foo Topic", "Foo description"));
        const votingSession = VotingSession.create(topic, 10);
        const savedVotingSession = await repository.createVotingSession(votingSession);
        const foundVotingSession = await repository.getVotingSessionByTopicId(topic.id as number);
        expect(foundVotingSession.length).toEqual(1);
    })

});

