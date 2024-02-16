import { validateCPF } from '../../src/helper-functions/validate-cpf';

describe('validateCpf', () => {
    it('should return true if cpf is valid and has only numbers', () => {
        const cpf = "86917063096";
        const result = validateCPF(cpf);
        expect(result).toBe(true);
    })

    it('should return true if cpf is valid and has special character', () => {
        const cpf = "869.170.630-96";
        const result = validateCPF(cpf);
        expect(result).toBe(true);
    })

    it('should return false if cpf is invalid', () => {
        const cpf = "12345678900";
        const result = validateCPF(cpf);
        expect(result).toBe(false);
    })
})