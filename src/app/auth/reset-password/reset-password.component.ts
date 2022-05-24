import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'
import { ActivatedRoute, Router } from '@angular/router'
import { FormGroup, FormControl, Validators } from '@angular/forms'

import { passwordMatchValidator } from '../passwordMatchValidator.directive';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPassForm: FormGroup;
  email?: string;
  isShowingAlert: boolean = false;
  isRequesting: boolean = false;
  alertType: string = '';
  alertMessage: string = '';

  constructor(private authService: AuthService, private aRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.email = this.aRoute.snapshot.params.user_email;
    this.resetPassForm = new FormGroup({
      tempPass: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      newPass: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.minLength(6),
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,}')]
      }),
      confirmPass: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required]
      })
    }, { validators: passwordMatchValidator })
  }

  onResetPassword() {
    this.isRequesting = true;
    const resetPassForm = this.resetPassForm.value;
    const passwordUpdate = {
      user_useremail: this.aRoute.snapshot.params.user_email,
      user_tempPass: resetPassForm.tempPass,
      user_newPassword: resetPassForm.newPass
    }
    if (resetPassForm.newPass === resetPassForm.confirmPass) {
      this.authService.updateUserPassword(passwordUpdate).subscribe(resp => {
        this.isRequesting = false;
        this.router.navigateByUrl('/auth/login');
      }, err => {
        this.isRequesting = false;
        this.setAlert('alert-danger', 'Las contraseña temporal no coincide');
      });
    }
  }

  private setAlert(alertType: string, alertMessage: string) {
    this.alertMessage = alertMessage;
    this.alertType = alertType;
    this.isShowingAlert = true;
    setTimeout(() => {
      this.isShowingAlert = false;
    }, 5000);
  }
}
