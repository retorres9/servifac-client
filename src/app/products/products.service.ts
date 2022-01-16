import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NewProduct } from './new-product/new-product.model';
import { ProductBill, Category, Provider, Location, Product } from './models/models';
import { tap } from 'rxjs/operators';
import { AppConfig } from '../../environments/environment.dev';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private _isAlarm$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public get isAlarm$(): BehaviorSubject<boolean> {
    return this._isAlarm$;
  }

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
    return this.http.get<Location>(AppConfig.baseUrl + 'location');
  }

  getProviders() {
    return this.http.get<Provider>(AppConfig.baseUrl + 'provider/combo');
  }

  postProduct(product: NewProduct) {
    return this.http.post<NewProduct>(AppConfig.baseUrl + 'product', product);
  }

  queryProduct(param: string) {
    const params = new HttpParams().set('param', param);
    return this.http.get<NewProduct[]>(AppConfig.baseUrl + 'product', {params});
  }

  getProductsInventory(criteria: string) {
    return this.http.get<Product[]>(AppConfig.baseUrl + `product/inventory/${criteria}`);
  }

  getProductWarning() {
    return this.http.get<boolean>(AppConfig.baseUrl + 'product/warning');
  }

  getProductMinimums() {
    return this.http.get<Product[]>(AppConfig.baseUrl + 'product/minimums');
  }
}
