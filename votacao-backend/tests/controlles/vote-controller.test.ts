import { Vote } from "../../src/entities/vote";
import { MockVoteRepository } from "../mocks/mock-vote-repository";
import { VoteController } from "../../src/controllers/vote-controller";
import { VotingTopic } from "../../src/entities/voting-topic";
import { User } from "../../src/entities/user";
import { VotingOption } from "../../src/entities/voting-options";

describe("VoteController", () => {
    let voteController: VoteController;
    let voteRepository: MockVoteRepository;
    const topic = VotingTopic.create("Foo Topic", "Foo Description");
    const fooUser = User.create("Foo User", "foo@test.com", "1234");
    const barUser = User.create("Bar User", "bar@test.com", "abcd");

    beforeEach(() => {
        voteRepository = new MockVoteRepository();
        voteController = new VoteController(voteRepository);
    });

    it("should save a vote", async () => {
        const vote = Vote.create(fooUser, topic, VotingOption.NO)
        const savedVote = await voteController.createVote(vote);
        expect(savedVote).toBe(vote);
    });

    it("should get the only vote from a topic", async () => {
        const vote = Vote.existing(1, fooUser, topic, VotingOption.NO);
        await voteRepository.saveVote(vote);
        const foundVote = await voteController.getVotesByTopicId(topic.id as number);
        expect(foundVote?.length).toEqual(1);
    });

    it("should get the two votes from a topic", async () => {
        await voteRepository.saveVote(Vote.existing(1, fooUser, topic, VotingOption.NO));
        await voteRepository.saveVote(Vote.existing(2, barUser, topic, VotingOption.YES));
        const foundVotes = await voteController.getVotesByTopicId(topic.id as number);
        expect(foundVotes?.length).toEqual(2);
    });

    it("should return undefined if no votes are found", async () => {
        const foundVotes = await voteController.getVotesByTopicId(topic.id as number);
        expect(foundVotes?.length).toEqual(0);
    });
});