import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password?.value === confirmPassword?.value) {
        confirmPassword?.setErrors(null);
        return null;
    }

    confirmPassword?.setErrors({ passwordMismatch: true });
    return { passwordMismatch: true };

}
