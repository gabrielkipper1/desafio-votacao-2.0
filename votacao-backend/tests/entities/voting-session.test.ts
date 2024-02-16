import { VotingSession } from '../../src/entities/voting-session';
import { VotingTopic } from '../../src/entities/voting-topic';
import { ERROR_MESSAGES } from '../../src/exceptions/erro-messages';

describe('Voting Session Creation', () => {
    const votingTopic = VotingTopic.create('Foo Topic', 'Foo category');

    it('should create a votting sessions', () => {
        expect(VotingSession.create(votingTopic, 20)).toBeInstanceOf(VotingSession);
    })

    it('should throw an error if a value is undefined', () => {
        expect(() => VotingSession.create(undefined, 10)).toThrow(ERROR_MESSAGES.INVALID_DATA);
    })

    it('should create a votting sessions with duration as zero', () => {
        expect(VotingSession.create(votingTopic, 0)).toBeInstanceOf(VotingSession);
    })

    it('should create a votting sessions with duration as negative', () => {
        expect(VotingSession.create(votingTopic, 1)).toBeInstanceOf(VotingSession);
    })

    it('check end time when duration is set for 10 minutes ', () => {
        const votingSession = VotingSession.create(votingTopic, 10);
        expect(votingSession.end_date).toEqual(new Date(votingSession.start_date.getTime() + 10 * 60000));
    })

    it('check end time when duration is zero ', () => {
        const votingSession = VotingSession.create(votingTopic, 0);
        expect(votingSession.end_date).toEqual(new Date(votingSession.start_date.getTime() + 60000));
    })

    it('check end time when duration is undefined ', () => {
        const votingSession = VotingSession.create(votingTopic, undefined);
        expect(votingSession.end_date).toEqual(new Date(votingSession.start_date.getTime() + 60000));
    })

    it("create an active session", () => {
        const votingSession = VotingSession.create(votingTopic, 10);
        expect(votingSession.isActive()).toBe(true);
    });

    it("create an expired session", () => {
        const votingSession = VotingSession.existing(1, votingTopic, new Date(Date.now() - 600000), new Date(Date.now() - 300000));
        expect(votingSession.isActive()).toBe(false);
    });
});