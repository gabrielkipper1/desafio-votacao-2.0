import { User } from '../../src/entities/user';
import { Vote } from '../../src/entities/vote';
import { VotingOption } from '../../src/entities/voting-options';
import { VotingTopic } from '../../src/entities/voting-topic';

describe('Vote Creation', () => {
    it('should create a new vote', () => {
        const user: User = User.create('foo user', 'foo@test.com', '1234');
        const topic: VotingTopic = VotingTopic.create('Foo Topic', 'Foo category');
        const vote: Vote = Vote.create(user, topic, VotingOption.NO);
        expect(vote).toBeInstanceOf(Vote);
    });

    it('should throw an error if a value is empty', () => {
        const user: User = User.create('foo user', 'foo@test.com', '1234');
        expect(() => Vote.create(user, undefined, VotingOption.NO)).toThrow('Invalid input values');
    });
});
