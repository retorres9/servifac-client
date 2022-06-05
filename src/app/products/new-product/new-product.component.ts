import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ProductsService } from "../products.service";
import { NewProduct } from "./new-product.model";
import { HeaderService } from "../../shared/components/header/header.service";

@Component({
  selector: "app-new-product",
  templateUrl: "./new-product.component.html",
  styleUrls: ["./new-product.component.scss"],
})
export class NewProductComponent implements OnInit {
  newProductForm: FormGroup;
  categories: any;
  locations: any;
  providers: any;

  price: string;
  tax: number;
  product: NewProduct;

  message: string;
  alertType: string;
  isAlert: boolean;
  loading: boolean = false;
  isTaxed: boolean = false

  constructor(
    private productService: ProductsService,
    private headerService: HeaderService
  ) { }

  ngOnInit(): void {
    this.headerService.setheaderTitle("Ingreso de Productos");
    let config = JSON.parse(localStorage.getItem("configuration"));
    this.tax = config.tax;
    this.newProductForm = new FormGroup({
      prod_name: new FormControl("", {
        updateOn: "change",
        validators: [Validators.required],
      }),
      prod_code: new FormControl("", {
        updateOn: "change",
        validators: [Validators.required, Validators.maxLength(13)],
      }),
      prod_price: new FormControl("", {
        updateOn: "change",
        validators: [Validators.required, Validators.min(0)],
      }),
      prod_normalProfit: new FormControl(20, {
        updateOn: "change",
        validators: [Validators.required],
      }),
      prod_wholesalePrice: new FormControl("", {
        updateOn: "change",
      }),
      prod_retailPrice: new FormControl("", {
        updateOn: "change",
      }),
      prod_wholesaleProfit: new FormControl(15, {
        updateOn: "change",
        validators: [Validators.required],
      }),
      quantity: new FormControl("", {
        updateOn: "change",
        validators: [Validators.required, Validators.min(0)],
      }),
      minQuantity: new FormControl("", {
        updateOn: "change",
        validators: [Validators.required, Validators.min(0)],
      }),
      category: new FormControl("", {
        updateOn: "change",
        validators: [Validators.required],
      }),
      prod_provider: new FormControl("", {
        updateOn: "change",
        validators: [Validators.required],
      }),
      location: new FormControl("", {
        updateOn: "change",
        validators: [Validators.required],
      }),
    });

    this.productService
      .getCategories()
      .subscribe((resp) => (this.categories = resp));
    this.productService.getLocations().subscribe((resp) => {
      this.locations = resp;
    });
    this.productService.getProviders().subscribe((resp) => {
      this.providers = resp;
    });
  }

  calculatePrice() {
    let normalProfit = this.newProductForm.value.prod_normalProfit;
    let wholesaleProfit = this.newProductForm.value.prod_wholesaleProfit;
    let retailPrice: string | number = this.calculatePrices(normalProfit);
    retailPrice = this.roundDecimal(Number(retailPrice));
    let wholesalePrice: string | number = this.calculatePrices(wholesaleProfit);
    wholesalePrice = this.roundDecimal(Number(wholesalePrice));
    this.newProductForm.controls["prod_wholesalePrice"].setValue(
      Number(wholesalePrice).toFixed(2)
    );
    this.newProductForm.controls["prod_retailPrice"].setValue(
      Number(retailPrice).toFixed(2)
    );
  }

  private calculatePrices(profit: number) {
    const productForm = this.newProductForm.value;
    if (this.isTaxed) {
      return Number(productForm.prod_price * ((this.tax + profit) / 100) + productForm.prod_price).toFixed(2);
    } else {
      return Number(productForm.prod_price * (profit / 100) + productForm.prod_price).toFixed(2);
    }
  }

  setPrice(precio: string) {
    this.price = precio;
  }

  onSaveProduct() {
    this.loading = true;
    const newProduct = new NewProduct();
    const productForm = this.newProductForm.value;
    newProduct.prod_isTaxed = this.isTaxed;
    newProduct.prod_name = productForm.prod_name;
    newProduct.prod_code = productForm.prod_code;
    newProduct.prod_price = productForm.prod_price;
    newProduct.prod_normalProfit = Number(productForm.prod_normalProfit);
    newProduct.prod_wholesaleProfit = Number(productForm.prod_wholesaleProfit);
    newProduct.prod_quantity = productForm.quantity;
    newProduct.prod_minQuantity = productForm.minQuantity;
    newProduct.loc_id = Number(productForm.location);
    newProduct.cat_id = Number(productForm.category);
    newProduct.ppr_productProvider = productForm.prod_provider;
    this.productService.postProduct(newProduct).subscribe(
      (resp) => {
        this.setAlert("Producto creado satisfactoriamente", "alert-success");
        this.loading = false;
        this.newProductForm.reset();
      },
      (error) => {
        this.loading = false;
        this.setAlert("Hubo un error", "alert-danger");
      }
    );
  }

  setAlert(message: string, type: string) {
    this.isAlert = true;
    this.message = message;
    this.alertType = type;
    setTimeout(() => {
      this.isAlert = false;
    }, 5000);
  }

  updatePrice() {
    this.isTaxed = !this.isTaxed;
    this.calculatePrice();
  }

  updateProfit(event) {
    this.calculatePrice()
  }

  private roundDecimal(price: number) {
    console.log(price, 'price');

    let stringNumber = typeof (price) === 'string' ? String(price).split('.') : String(price.toFixed(2)).split('.');
    let decimal;
    if (stringNumber[1] === undefined) {
      return price;
    }
    if (Number(stringNumber[1]) >= 95) {
      return Math.round(price);
    }
    console.log(stringNumber[1], 'before');

    Number(stringNumber[1]) % 5 === 0
      ? (decimal = Number(stringNumber[1]))
      : (decimal = Number(Math.floor(Number(stringNumber[1]) / 5) * 5) + 5);
    console.log(decimal, 'after');
    let newNumber = `${stringNumber[0]}.${decimal}`;
    return newNumber;
  }
}
