import { User } from "../../src/entities/user";
import { Vote } from "../../src/entities/vote";
import { VotingOption } from "../../src/entities/voting-options";
import { VotingTopic } from "../../src/entities/voting-topic";

describe('Voting Topic Creation', () => {
    it('should create a new voting topic', () => {
        expect(new VotingTopic('Foo Topic')).toBeInstanceOf(VotingTopic);
    })

    it('should throw an error if a value is empty', () => {
        expect(() => new VotingTopic('')).toThrow('Invalid input values');
    });

    it('should throw an error if a value is undefined', () => {
        expect(() => new VotingTopic(undefined)).toThrow('Invalid input values');
    });

    it('add vote', () => {
        const topic = new VotingTopic('Foo Topic');
        const user = new User('1', 'foo user', 'foo@test.com', '1234');
        const vote = new Vote(user, topic, VotingOption.NO);
        topic.addVote(vote);
        expect(topic.votes.size).toBe(1);
    });

    it('add two votes for the same user', () => {
        const topic = new VotingTopic('Foo Topic');
        const user = new User('1', 'foo user', 'foo@test.com', '1234');
        const voteNo = new Vote(user, topic, VotingOption.NO);
        const voteYes = new Vote(user, topic, VotingOption.NO);
        topic.addVote(voteNo);
        topic.addVote(voteYes);
        expect(topic.votes.size).toBe(1);
    });

    it('add two votes for different users', () => {
        const topic = new VotingTopic('Foo Topic');
        const userFoo = new User('1', 'foo user', 'foo@test.com', '1234');
        const userBar = new User('2', 'bar user', 'bar@test.com', 'abcd');
        const voteFoo = new Vote(userFoo, topic, VotingOption.NO);
        const voteBar = new Vote(userBar, topic, VotingOption.YES);
        topic.addVote(voteBar);
        topic.addVote(voteFoo);
        expect(topic.votes.size).toBe(2);
    });
});