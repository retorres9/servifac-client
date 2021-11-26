import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NewProduct } from './new-product/new-product.model';
import { ProductBill, Category, Provider, Location, Product } from './models/models';
import { tap } from 'rxjs/operators';
import { AppConfig } from '../../environments/environment.dev';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProductBarcode(code: string) {
    return this.http.get<ProductBill>(`${AppConfig.baseUrl}product/${code}`).pipe(
      tap(resp => console.log(resp))
    );
  }

  getCategories() {
    return this.http.get<Category>(AppConfig.baseUrl + 'category');
  }

  getLocations() {
    return this.http.get<Location>('http://127.0.0.1:3000/location');
  }

  getProviders() {
    return this.http.get<Provider>('http://127.0.0.1:3000/provider/combo');
  }

  postProduct(product: NewProduct) {
    const token = JSON.parse(localStorage.getItem('token'));
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token.accessToken}`
      })
    };
    return this.http.post<NewProduct>('http://127.0.0.1:3000/product', product, httpOptions);
  }

  queryProduct(param: string) {
    const params = new HttpParams().set('param', param);
    return this.http.get<NewProduct[]>('http://127.0.0.1:3000/product', {params});
  }

  getProductsInventory(criteria: string) {
    // const params = new HttpParams().set('criteria', criteria);
    return this.http.get<Product[]>(`http://127.0.0.1:3000/product/inventory/${criteria}`);
  }

  getProductWarning() {
    return this.http.get<boolean>('http://127.0.0.1:3000/product/warning');
  }

  getProductMinimums() {
    return this.http.get<Product[]>('http://127.0.0.1:3000/product/minimums');
  }
}
