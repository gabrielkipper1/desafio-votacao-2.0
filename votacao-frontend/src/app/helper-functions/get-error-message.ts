export function getErrorMessage(error: any): string {
    if (error instanceof Error) {
        return error.message;
    }

    if ('string' === typeof error) {
        return error;
    }

    return "Erro Desconhecido!";
}