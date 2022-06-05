import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const passwordMatchValidator: ValidatorFn =
  (control: AbstractControl): ValidationErrors | null => {
    const newPass = control.get('newPass');
    const confirmPass = control.get('confirmPass');

    return newPass.value === confirmPass.value ?
      null :
      { passwordMatch: true };
  };
