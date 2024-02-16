import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { validateCPF } from "./cpf-validator";

export function cpfFormValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (!value) {
            return null;
        }

        return validateCPF(value) ? null : { cpfInvalid: true };

    }
}