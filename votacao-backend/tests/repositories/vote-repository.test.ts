import { MockVoteRepository } from "../mocks/mock-vote-repository";
import { Vote } from "../../src/entities/vote";
import { User } from "../../src/entities/user";
import { VotingTopic } from "../../src/entities/voting-topic";
import { VotingOption } from "../../src/entities/voting-options";

describe("VoteRepository", () => {
    let voteRepository: MockVoteRepository;
    const fooUser = User.create("Foo User", "foo@test.com", "1234");
    const barUser = User.create("Bar User", "bar@test.com", "abcd");
    const topic = VotingTopic.create("Foo Topic", "Description of Foo Topic");

    beforeEach(() => {
        voteRepository = new MockVoteRepository();
    });

    it("should save a vote", async () => {
        const vote = Vote.create(fooUser, topic, VotingOption.NO);
        const savedVote = await voteRepository.saveVote(vote);
        expect(savedVote).toBe(vote);
    })

    it("should get a vote by id", async () => {
        const voteId = 1;
        const vote = Vote.existing(voteId, fooUser, topic, VotingOption.NO);
        await voteRepository.saveVote(vote);
        const foundVote = await voteRepository.getVoteById(voteId);
        expect(foundVote?.id).toEqual(voteId)
    });

    it("should return undefined if vote not found", async () => {
        const foundVote = await voteRepository.getVoteById(1);
        expect(foundVote).toBeUndefined();
    });

});