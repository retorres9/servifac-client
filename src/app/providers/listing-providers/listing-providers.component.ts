import { Component, OnInit } from '@angular/core';
import { Provider } from '../provider.model';
import { ProvidersService } from '../providers.service';

@Component({
  selector: 'app-listing-providers',
  templateUrl: './listing-providers.component.html',
  styleUrls: ['./listing-providers.component.scss']
})
export class ListingProvidersComponent implements OnInit {
  providers: Provider[];
  action: string;

  constructor(private providerService: ProvidersService) { }

  ngOnInit() {
    this.providerService.getProviders().subscribe(
      resp => {
        this.providers = resp;
      }
    )
  }
  payment() {
    this.action = 'PAGO';
  }

  credit() {
    this.action = 'CREDITO';
  }

}
