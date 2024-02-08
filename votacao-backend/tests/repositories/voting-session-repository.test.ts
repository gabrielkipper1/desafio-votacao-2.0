import { MockVotingSessionRepository } from "../mocks/mock-voting-session-repository";
import { VotingSession } from "../../src/entities/voting-session";
import { VotingTopic } from "../../src/entities/voting-topic";

describe("VotingSessionRepository", () => {
    let votingSessionRepository: MockVotingSessionRepository;

    beforeEach(() => {
        votingSessionRepository = new MockVotingSessionRepository();
    });

    it("should save a voting session", async () => {
        const topic = VotingTopic.create("Foo Topic", "Description of Foo Topic");
        const votingSession = VotingSession.create(topic, 10);
        const savedVotingSession = await votingSessionRepository.createVotingSession(votingSession);
        expect(savedVotingSession).toBe(votingSession);
    })

    it("should get a voting session by id", async () => {
        const topic = VotingTopic.create("Foo Topic", "Description of Foo Topic");
        const votingSessionId = 1;
        const votingSession = VotingSession.existing(votingSessionId, topic, new Date(), new Date(Date.now() + 600000));
        await votingSessionRepository.createVotingSession(votingSession);
        const foundVotingSession = await votingSessionRepository.getVotingSessionById(votingSessionId);
        expect(foundVotingSession?.id).toEqual(votingSessionId)
    });

    it("should return undefined if voting session not found", async () => {
        const foundVotingSession = await votingSessionRepository.getVotingSessionById(1);
        expect(foundVotingSession).toBeUndefined();
    });
});