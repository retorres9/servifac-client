import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialsJwt } from '../../../auth/jwt-credentials.model';
import jwt_decode from 'jwt-decode';
import { ProductsService } from '../../../products/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  alert: boolean;
  user: string;
  @Input() tab: string;
  constructor(private router: Router, private productService: ProductsService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const credentials: CredentialsJwt = jwt_decode(token);
    this.user = credentials.user_username;
    this.productService.getProductWarning().subscribe(
      resp => this.alert = resp
    )
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('auth/login');
  }

}
