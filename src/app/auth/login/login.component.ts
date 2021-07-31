import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import jwt_decode from "jwt-decode";

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
  loading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
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
    const token = localStorage.getItem("token");
    console.log(token);

    if (token !== null) {
      console.log(token);
      const decoded: CredentialsJwt = jwt_decode(token);
      let bool = new Date() > new Date(decoded.exp * 1000) ? true : false;

      if (!bool) {
        console.log("no expira");

        this.router.navigate(["home"]);
      }
    }
  }

  onLogin() {
    this.loading = true;
    const credentials = new Credentials();
    credentials.user_username = this.form.value.username;
    credentials.user_password = this.form.value.password;
    console.log(this.form);
    this.authService.onLogin(credentials).subscribe(
      (resp) => {
        this.authService.getConfiguration().subscribe((resp) => {
          console.log(resp);

          localStorage.setItem("configuration", JSON.stringify(resp));
        });
        localStorage.setItem("token", JSON.stringify(resp));
        this.loading = false;
        this.router.navigate(["home"]);
      },
      (error) => {
        this.isError = true;
        this.loading = false;
        setTimeout(() => {
          this.isError = false;
        }, 5000);
      }
    );
  }
}
