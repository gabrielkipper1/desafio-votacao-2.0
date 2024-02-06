import { User } from '../../src/entities/user';
import { Vote } from '../../src/entities/vote';
import { VotingOption } from '../../src/entities/voting-options';
import { VotingTopic } from '../../src/entities/voting-topic';

describe('Vote Creation', () => {
    it('should create a new vote', () => {
        const user: User = new User('1', 'foo user', 'foo@test.com', '1234');
        const topic: VotingTopic = new VotingTopic('Foo Topic');
        const vote: Vote = new Vote(user, topic, VotingOption.NO);
        expect(vote).toBeInstanceOf(Vote);
    });

    it('should throw an error if a value is empty', () => {
        const user: User = new User('1', 'foo user', 'foo@test.com', '1234');
        expect(() => new Vote(user, undefined, VotingOption.NO)).toThrow('Invalid input values');
    });
});
