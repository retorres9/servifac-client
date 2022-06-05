import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AuthService } from '../auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  isResettingPassword: boolean = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onForgotPassword(forgotPassword: NgForm) {
    console.log(forgotPassword?.controls.user_email.value);

    const user_email = {
      user_email: forgotPassword?.controls.user_email.value
    };
    this.isResettingPassword = true;
    setTimeout(() => {
      this.authService.resetPassword(user_email).subscribe(resp => {
        this.router.navigateByUrl(`/auth/reset-password/${forgotPassword?.controls.user_email.value}`);
      });
      this.isResettingPassword = false;
    }, 2000);
  }

}
