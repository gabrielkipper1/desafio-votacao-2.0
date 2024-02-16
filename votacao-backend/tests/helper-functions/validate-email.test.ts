import { validateEmail } from '../../src/helper-functions/validate-email';

describe('validateEmail', () => {
    it('should return true if email is valid', () => {
        const email = "test@test.com"
        const result = validateEmail(email);
        expect(result).toBe(true);
    });

    it('should return false if email is invalid', () => {
        const email = "test@test"
        const result = validateEmail(email);
        expect(result).toBe(false);
    });
});