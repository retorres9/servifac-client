import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { Credentials } from "./credentials.model";
import { AuthService } from "../auth.service";
import { HeaderService } from "../../shared/components/header/header.service";

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

  constructor(
    private authService: AuthService,
    private router: Router,
    private headerService: HeaderService
  ) {}

  ngOnInit() {
    console.log('log 1');

    this.headerService.hide();
    console.log('log 2');
    this.headerService.setIsLoggedIn$(false);
    console.log('log 3');
    console.log('reached login');
    console.log('log 4');

    this.form = new FormGroup({
      username: new FormControl("", {
        updateOn: "change",
        validators: [Validators.required],
      }),
      password: new FormControl("", {
        updateOn: "change",
        validators: [Validators.required],
      })
    });
    console.log('log 5');
    // const token = localStorage.getItem("token");
    // if (token !== null) {
    //   const decoded: CredentialsJwt = jwt_decode(token);
    //   let bool = new Date() > new Date(decoded.exp * 1000) ? true : false;

    //   if (!bool) {
    //     // this.router.navigate(["home"]);
    //   }
    // }
  }

  onLogin() {
    this.loading = true;
    const credentials = new Credentials();
    credentials.user_username = this.form.value.username;
    credentials.user_password = this.form.value.password;
    this.authService.onLogin(credentials).subscribe(
      (resp) => {
        this.authService.getConfiguration().subscribe((resp) => {
          localStorage.setItem("configuration", JSON.stringify(resp));
        });
        localStorage.setItem("token", JSON.stringify(resp));
        this.loading = false;
        this.headerService.show();
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
