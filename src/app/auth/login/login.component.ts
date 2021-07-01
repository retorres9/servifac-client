import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { Credentials } from "./credentials.model";
import { AuthService } from "../auth.service";
import { CredentialsJwt } from "../jwt-credentials.model";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  credentials!: Credentials;
  isError: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    // const decoded: CredentialsJwt = jwt_decode(token);
    // let bool = new Date() > new Date(decoded.exp * 1000) ? true : false;
    // const usernameInput = document.querySelector('.username');
    // usernameInput.setF

    this.form = new FormGroup({
      username: new FormControl("", {
        updateOn: "change",
        validators: [Validators.required],
      }),
      password: new FormControl("", {
        updateOn: "change",
        validators: [Validators.required],
      }),
    });
  }

  onLogin() {
    const credentials = new Credentials();
    credentials.user_username = this.form.value.username;
    credentials.user_password = this.form.value.password;
    console.log(this.form);
    this.authService.onLogin(credentials).subscribe(
      (resp) => {
        console.log(resp);
        localStorage.setItem('token', JSON.stringify(resp));
        this.router.navigate(['home']);
      },
      (error) => {
        this.isError = true;
        setTimeout(() => {
          this.isError = false;
        }, 5000);
      }
    );
  }
}
