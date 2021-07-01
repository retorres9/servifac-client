import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

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
    this.user = this.authService.user.user_username;
  }

}
