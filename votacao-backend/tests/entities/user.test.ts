import { ERROR_MESSAGES } from '../../dist/exceptions/erro-messages';
import { User } from '../../src/entities/user';

describe('User Creation', () => {
    it('should create a new user', () => {
        expect(User.create("Foo user", "foo@test.com", "1234")).toBeInstanceOf(User);
    })

    it('should throw an error if a value is empty', () => {
        expect(() => User.create("", "foo@test.com", "1234")).toThrow(ERROR_MESSAGES.INVALID_DATA);
    });

    it('should throw an error if a value is undefined', () => {
        expect(() => User.create(undefined, "foo@test.com", "12345")).toThrow(ERROR_MESSAGES.INVALID_DATA);
    });

});