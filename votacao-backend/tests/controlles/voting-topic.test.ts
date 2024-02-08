import { MockVotingTopicRepository } from "../mocks/mock-voting-topic-repository";
import { VotingTopic } from "../../src/entities/voting-topic";
import { VotingTopicController } from "../../src/controllers/voting-topic-controller";

describe("VotingTopicController", () => {
    let votingTopicController: VotingTopicController;
    let votingTopicRepository: MockVotingTopicRepository;
    const topic = VotingTopic.create("Foo Topic", "Foo Description");

    beforeEach(() => {
        votingTopicRepository = new MockVotingTopicRepository();
        votingTopicController = new VotingTopicController(votingTopicRepository);
    });

    it("should save a voting topic", async () => {
        const savedVotingTopic = await votingTopicController.createVotingTopic(topic);
        expect(savedVotingTopic).toBe(topic);
    });

    it("should get a voting topic by id", async () => {
        await votingTopicRepository.createVotingTopic(topic);
        const foundVotingTopic = await votingTopicController.getVotingTopicById(topic.id as number);
        expect(foundVotingTopic?.id).toEqual(topic.id)
    });

    it("should return undefined if voting topic not found", async () => {
        const foundVotingTopic = await votingTopicController.getVotingTopicById(1);
        expect(foundVotingTopic).toBeUndefined();
    });
});