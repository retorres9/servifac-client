import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../shared/components/header/header.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private headerService: HeaderService,
    private router: Router) { }

  ngOnInit(): void {
    // this.headerService.getIsLoggedIn$;
    console.log('executing header service');
    this.headerService.show();
    console.log(this.headerService.isVisible);


    this.headerService.setheaderTitle('Menú principal');
  }
  logout() {
    this.router.navigateByUrl('auth/login');
  }
}
