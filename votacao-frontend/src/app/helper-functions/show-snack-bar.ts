import { MatSnackBar } from "@angular/material/snack-bar";

export function showErrorSnackBar(message: any, snackBar: MatSnackBar) {
    if (typeof message !== 'string') {
        message = "Erro Desconhecido!";
    }

    snackBar.open(message, undefined, {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
    });
}

export function showSuccessSnackBar(message: string, snackBar: MatSnackBar) {
    snackBar.open(message, undefined, {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration: 3000,
    });
}