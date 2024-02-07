import { User } from "../../src/entities/user";
import { Vote } from "../../src/entities/vote";
import { VotingOption } from "../../src/entities/voting-options";
import { VotingSession } from "../../src/entities/voting-session";
import { VotingTopic } from "../../src/entities/voting-topic";

describe('Voting Topic Creation', () => {

    const fooUser = User.existing(2, 'foo user', 'foo@test.com', '1234');
    const barUser = User.existing(1, 'bar user', 'bar@test.com', 'abcd');

    it('should create a new voting topic', () => {
        expect(VotingTopic.create("foo topic", "foo category")).toBeInstanceOf(VotingTopic);
    })

    it('should throw an error if a value is empty', () => {
        expect(() => VotingTopic.create("", "foo category")).toThrow('Invalid input values');
    });

    it('should throw an error if a value is undefined', () => {
        expect(() => VotingTopic.create(undefined, "")).toThrow('Invalid input values');
    });

    it('add vote', () => {
        const topic = VotingTopic.create("Foo Topic", "Foo category");
        const vote = Vote.create(fooUser, topic, VotingOption.NO);
        topic.createSession(10);
        topic.addVote(vote);
        expect(topic.votes.size).toBe(1);
    });

    it('add two votes for the same user', () => {
        const topic = VotingTopic.create("Foo Topic", "Foo category");
        const voteYes = Vote.create(fooUser, topic, VotingOption.YES);
        const voteNo = Vote.create(fooUser, topic, VotingOption.NO);
        topic.createSession(10)
        expect(() => {
            topic.addVote(voteNo);
            topic.addVote(voteYes)
        }).toThrow('User cannot vote twice on same topic');
    });

    it('add two votes for different users', () => {
        const topic = VotingTopic.create("Foo Topic", "Foo category");
        const fooVote = Vote.create(fooUser, topic, VotingOption.NO);
        const barVote = Vote.create(barUser, topic, VotingOption.YES);
        topic.createSession(10);
        topic.addVote(fooVote);
        topic.addVote(barVote);
        expect(topic.votes.size).toBe(2);
    });

    it('add vote in expired session', () => {
        const topic = VotingTopic.create("Foo Topic", "Foo category");
        const fooVote = Vote.create(fooUser, topic, VotingOption.NO);
        const barVote = Vote.create(barUser, topic, VotingOption.YES);
        topic.createSession(1);
        topic.addVote(barVote);
        topic.addVote(fooVote);
        expect(topic.votes.size).toBe(2);
    });
});