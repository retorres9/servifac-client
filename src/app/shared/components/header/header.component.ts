import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialsJwt } from '../../../auth/jwt-credentials.model';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: string;
  @Input() tab: string;
  constructor(private router: Router) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const credentials: CredentialsJwt = jwt_decode(token);
    this.user = credentials.user_username;
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('auth/login');
  }

}
