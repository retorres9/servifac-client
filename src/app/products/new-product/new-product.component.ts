import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {
  newProductForm: FormGroup;
  categories: any;
  locations: any;
  providers: any;
  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
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
      prod_retailGain: new FormControl(20, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      prod_wholesaleGain: new FormControl(15 , {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      prod_retailPrice: new FormControl("", {
        updateOn: 'change',
        validators: [Validators.required, Validators.min(0.05)]
      }),
      prod_wholesalePrice: new FormControl("", {
        updateOn: 'change',
        validators: [Validators.required, Validators.min(0)]
      }),
      quantity: new FormControl("", {
        updateOn: 'change',
        validators: [Validators.required, Validators.min(0)]
      }),
      minQuantity: new FormControl("", {
        updateOn: 'change',
        validators: [Validators.required, Validators.min(0)]
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
    console.log(Number((this.newProductForm.value.prod_price * 0.32) + this.newProductForm.value.prod_price).toFixed(2));
    console.log(Number((this.newProductForm.value.prod_price * 0.27) + this.newProductForm.value.prod_price).toFixed(2));
    this.newProductForm.controls['prod_wholesalePrice'].setValue(Number((this.newProductForm.value.prod_price * 0.27) + this.newProductForm.value.prod_price).toFixed(2));
    this.newProductForm.controls['prod_retailPrice'].setValue(Number((this.newProductForm.value.prod_price * 0.32) + this.newProductForm.value.prod_price).toFixed(2));

  }

}
