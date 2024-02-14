export function validateCPF(cpf: string): boolean {
    const cleanedCPF = cpf.replace(/\D/g, '');

    if (cleanedCPF.length !== 11 || cleanedCPF.split('').every(digit => digit === cleanedCPF[0])) {
        // 11 digits and cannot all be the same digit
        return false;
    }

    let sum = 0;
    let remainder: number;

    for (let i = 1; i <= 9; i++) {
        sum += parseInt(cleanedCPF.substring(i - 1, i)) * (11 - i);
    }

    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) {
        remainder = 0;
    }

    if (remainder !== parseInt(cleanedCPF.substring(9, 10))) {
        return false;
    }

    sum = 0;

    for (let i = 1; i <= 10; i++) {
        sum += parseInt(cleanedCPF.substring(i - 1, i)) * (12 - i);
    }

    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) {
        remainder = 0;
    }

    if (remainder !== parseInt(cleanedCPF.substring(10, 11))) {
        return false;
    }

    return true;
}