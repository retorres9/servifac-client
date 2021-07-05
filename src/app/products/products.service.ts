import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

interface client {
  prod_name: string;
  prod_price: string;
}

interface Location {
  loc_id: number;
  loc_name: string;
}

interface Category {
  cat_id: number;
  cat_name: string;
}

interface Provider {
  prov_ruc: string;
  prov_name: string;
}
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProductBarcode(code: string) {
    return this.http.get<client>(`http://127.0.0.1:3000/product/${code}`);
  }

  getCategories() {
    return this.http.get<Category>('http://127.0.0.1:3000/category');
  }

  getLocations() {
    return this.http.get<Location>('http://127.0.0.1:3000/location');
  }

  getProviders() {
    return this.http.get<Provider>('http://127.0.0.1:3000/provider/combo');
  }
}
