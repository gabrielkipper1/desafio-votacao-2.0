import { BCryptPasswordEncoder } from "../../../src/data-parsers/credentials/bcrypt-password-encoder";


describe('BCryptPasswordEncoder', () => {
    let passwordEncoder: BCryptPasswordEncoder;

    beforeEach(() => {
        passwordEncoder = new BCryptPasswordEncoder();
    });

    it('should encode a password', async () => {
        const password = 'password123';
        const hashedPassword = await passwordEncoder.encode(password);
        expect(hashedPassword).toBeDefined();
        expect(hashedPassword).not.toEqual(password);
    });

    it('should return true when comparing a password with its hash', async () => {
        const password = 'password123';
        const hashedPassword = await passwordEncoder.encode(password);
        const result = await passwordEncoder.compare(password, hashedPassword);
        expect(result).toBe(true);
    });

    it('should return false when comparing a wrong password with its hash', async () => {
        const password = 'password123';
        const wrongPassword = 'wrongpassword';
        const hashedPassword = await passwordEncoder.encode(password);
        const result = await passwordEncoder.compare(wrongPassword, hashedPassword);
        expect(result).toBe(false);
    });
});