import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';
import { NewProduct } from './new-product.model';

interface Product {
  prod_name;
}
@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {
  newProductForm: FormGroup;
  categories: any;
  locations: any;
  pre: string;
  providers: any;
  message: string;
  type: string;
  product: NewProduct;
  isAlert: boolean;
  tax: number;
  loading: boolean = false;
  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    let config = JSON.parse(localStorage.getItem('configuration'));
    this.tax = config.tax;
    this.newProductForm = new FormGroup({
      prod_name: new FormControl("", {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      prod_code: new FormControl("", {
        updateOn: 'change',
        validators: [Validators.required, Validators.maxLength(13)]
      }),
      prod_price: new FormControl("", {
        updateOn: 'change',
        validators: [Validators.required, Validators.min(0)]
      }),
      prod_normalProfit: new FormControl(20, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      prod_wholesalePrice: new FormControl('', {
        updateOn: 'change',
      }),
      prod_retailPrice: new FormControl('',{
        updateOn: 'change'
      }),
      prod_wholesaleProfit: new FormControl(15 , {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      quantity: new FormControl("", {
        updateOn: 'change',
        validators: [Validators.required, Validators.min(0)]
      }),
      minQuantity: new FormControl("", {
        updateOn: 'change',
        validators: [Validators.required, Validators.min(0)]
      }),
      category: new FormControl("", {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      prod_provider: new FormControl("", {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      location: new FormControl("", {
        updateOn: 'change',
        validators: [Validators.required]
      })
    });

    this.productService.getCategories().subscribe(
      resp => this.categories = resp
    );
    this.productService.getLocations().subscribe(
      resp => {
        this.locations = resp
        console.log(resp);

      }
    )
    this.productService.getProviders().subscribe(
      resp => {
        this.providers = resp
        console.log(resp);

      }
    )
  }

  calculatePrice() {
    let retailPrice: string | number = Number((this.newProductForm.value.prod_price * (0.20 + (this.tax/100))) + this.newProductForm.value.prod_price).toFixed(2);
    retailPrice = this.roundDecimal(Number(retailPrice));
    let wholesalePrice: string | number = Number((this.newProductForm.value.prod_price * 0.27) + this.newProductForm.value.prod_price).toFixed(2);
    wholesalePrice = this.roundDecimal(Number(wholesalePrice));
    this.newProductForm.controls['prod_wholesalePrice'].setValue(Number(wholesalePrice).toFixed(2));
    this.newProductForm.controls['prod_retailPrice'].setValue(Number(retailPrice).toFixed(2));
  }

  setPrice(precio: string) {
    console.log(precio);
    this.pre = precio
  }

  onSaveProduct() {
    this.loading = true;
    const newProduct = new NewProduct();
    newProduct.prod_name = this.newProductForm.value.prod_name;
    newProduct.prod_code = this.newProductForm.value.prod_code;
    newProduct.prod_price = this.newProductForm.value.prod_price;
    newProduct.prod_normalProfit = Number(this.newProductForm.value.prod_normalProfit);
    newProduct.prod_wholesaleProfit = Number(this.newProductForm.value.prod_wholesaleProfit);
    newProduct.prod_quantity = this.newProductForm.value.quantity;
    newProduct.prod_minQuantity = this.newProductForm.value.minQuantity;
    newProduct.loc_id = Number(this.newProductForm.value.location);
    newProduct.cat_id = Number(this.newProductForm.value.category);
    newProduct.ppr_productProvider = this.newProductForm.value.prod_provider;
    this.productService.postProduct(newProduct).subscribe(
      resp => {
        this.setAlert('Producto creado satisfactoriamente', 'alert-success');
        this.loading = false;
        this.newProductForm.reset();
      }, error => {
        this.loading = false;
        this.setAlert('Hubo un error', 'alert-danger');
      }
    )
  }

  setAlert(message: string, type: string) {
    this.isAlert = true;
    this.message = message;
    this.type = type;
    setTimeout(() => {
      this.isAlert = false;
    }, 5000);
  }

  roundDecimal(value: number) {
    console.log(value);

    let stringNumber = String(value).split('.');
    if (stringNumber[1]=== undefined) {
      return value;
    }
    if (Number(stringNumber[1]) >= 95) {
      return Math.round(value);
    }
    console.log(stringNumber[1]);
    let decimal;
    (Number(stringNumber[1]) % 5 === 0) ? (decimal = Number(stringNumber[1])): (decimal = Number(Math.floor(Number(stringNumber[1])/5) *5) + 5);
    let newNumber = `${stringNumber[0]}.${decimal}`;

    return newNumber;
  }
}
