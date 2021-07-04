import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import jwt_decode from 'jwt-decode';
import { CredentialsJwt } from '../auth/jwt-credentials.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: string;
  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const credentials: CredentialsJwt = jwt_decode(token);
    this.user = credentials.user_username;
  }

}
