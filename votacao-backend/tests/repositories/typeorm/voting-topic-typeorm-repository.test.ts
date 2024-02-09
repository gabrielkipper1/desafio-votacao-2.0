import { DataSource } from "typeorm";
import { VotingTopicRepository } from "../../../src/repositories/interfaces/voting-topic-repository";
import { SqliteDataSource } from "../../../src/repositories/typeorm/data-sources/sqlite-connetion";
import { VotingTopicTypeormRepository } from "../../../src/repositories/typeorm/repositories/voting-topic-typeorm-repository";
import { VotingTopic } from "../../../src/entities/voting-topic";
import { VotingTopicSchema } from "../../../src/repositories/typeorm/schemas/voting-topic-schema";

let dataSource: DataSource;
let repository: VotingTopicRepository;

beforeAll(async () => {
    dataSource = await SqliteDataSource.initialize();
    repository = new VotingTopicTypeormRepository(SqliteDataSource.getRepository<VotingTopic>(VotingTopicSchema));
});

afterAll(async () => {
    dataSource.destroy();
});


describe('VotingTopicTypeORMRepository', () => {
    it('should create a new voting topic', async () => {
        const topic = VotingTopic.create("Foo Topic", "Foo description");
        const insertedTopic = await repository.createVotingTopic(topic);
        expect(insertedTopic).toBeInstanceOf(VotingTopic);
    });

    it('should get a voting topic by id', async () => {
        const topic = VotingTopic.create("Foo Topic", "Foo description");
        const insertedTopic = await repository.createVotingTopic(topic);
        const foundTopic = await repository.getVotingTopicById(insertedTopic.id as number);
        expect(foundTopic?.id).toEqual(insertedTopic.id);
    })
});



