import { MockVotingTopicRepository } from "../mocks/mock-voting-topic-repository";
import { VotingTopic } from "../../src/entities/voting-topic";

describe("VotingTopicRepository", () => {
    let votingTopicRepository: MockVotingTopicRepository;

    beforeEach(() => {
        votingTopicRepository = new MockVotingTopicRepository();
    });

    it("should save a voting topic", async () => {
        const votingTopic = VotingTopic.create("Foo Topic", "Description of Foo Topic");
        const savedVotingTopic = await votingTopicRepository.createVotingTopic(votingTopic);
        expect(savedVotingTopic).toBe(votingTopic);
    })

    it("should get a voting topic by id", async () => {
        const votingTopicId = 1;
        const votingTopic = VotingTopic.existing(votingTopicId, "Foo Topic", "Description of Foo Topic", []);
        await votingTopicRepository.createVotingTopic(votingTopic);
        const foundVotingTopic = await votingTopicRepository.getVotingTopicById(1);
        expect(foundVotingTopic?.id).toEqual(votingTopicId)
    });

    it("should return undefined if voting topic not found", async () => {
        const foundVotingTopic = await votingTopicRepository.getVotingTopicById(1);
        expect(foundVotingTopic).toBeUndefined();
    });
});