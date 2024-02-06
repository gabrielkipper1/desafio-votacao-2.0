import { User } from '../../src/entities/user';

describe('User Creation', () => {
    it('should create a new user', () => {
        expect(new User('1', 'Foo User', 'foo@teste.com', '1234')).toBeInstanceOf(User);
    })

    it('should throw an error if a value is empty', () => {
        expect(() => new User('', 'Foo User', 'foo@teste.com', '1234')).toThrow('Invalid input values');
    });

    it('should throw an error if a value is undefined', () => {
        expect(() => new User('1', 'Foo User', 'foo@test.com', undefined)).toThrow('Invalid input values');
    });

});