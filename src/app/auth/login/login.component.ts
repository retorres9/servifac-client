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
    this.headerService.hide();
    this.headerService.setIsLoggedIn$(false);
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
