import { MockVotingSessionRepository } from "../mocks/mock-voting-session-repository";
import { VotingSession } from "../../src/entities/voting-session";
import { VotingSessionController } from "../../src/controllers/voting-sessions-controller";
import { VotingTopic } from "../../src/entities/voting-topic";

describe("VotingSessionController", () => {
    let votingSessionController: VotingSessionController;
    let votingSessionRepository: MockVotingSessionRepository;
    const topic = VotingTopic.existing(1, "Foo Topic", "Description of Foo Topic", []);

    beforeEach(() => {
        votingSessionRepository = new MockVotingSessionRepository();
        votingSessionController = new VotingSessionController(votingSessionRepository);
    });

    it("should save a voting session", async () => {
        const savedVotingSession = await votingSessionController.createVotingSession({
            topicId: topic.id as number,
            durationInMinutes: 10,
        });
        expect(savedVotingSession).toBe(savedVotingSession);
    });

    it("should get a voting session by id", async () => {
        await votingSessionRepository.createVotingSession(VotingSession.existing(1, topic, new Date(), new Date(Date.now() + 60000)));
        const foundVotingSession = await votingSessionController.getVotingSessionById(topic.id as number);
        expect(foundVotingSession?.id).toEqual(topic.id)
    });

    it("should return undefined if voting session not found", async () => {
        const foundVotingSession = await votingSessionController.getVotingSessionById(1);
        expect(foundVotingSession).toBeUndefined();
    });
});