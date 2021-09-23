import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NewProduct } from './new-product/new-product.model';
import { ProductBill, Category, Provider, Location } from './models/models';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProductBarcode(code: string) {
    return this.http.get<ProductBill>(`http://127.0.0.1:3000/product/${code}`);
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
}
