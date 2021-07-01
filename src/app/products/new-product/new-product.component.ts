import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {

  newProductForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.newProductForm = new FormGroup({
      prod_name: new FormControl("", {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      prod_price: new FormControl("", {
        updateOn: 'change',
        validators: [Validators.required, Validators.min(0)]
      }),
      prod_priceMajor: new FormControl("", {
        updateOn: 'change',
        validators: [Validators.required, Validators.min(0)]
      }),
      quantity: new FormControl("", {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      minQuantity: new FormControl("", {
        updateOn: 'change',
        validators: [Validators.required]
      })
    })
  }

  calculatePrice() {
    console.log(Number((this.newProductForm.value.prod_price * 0.32) + this.newProductForm.value.prod_price).toFixed(2));
    console.log(Number((this.newProductForm.value.prod_price * 0.22) + this.newProductForm.value.prod_price).toFixed(2));
    this.newProductForm.controls['prod_priceMajor'].setValue(Number((this.newProductForm.value.prod_price * 0.22) + this.newProductForm.value.prod_price).toFixed(2));
  }

}
