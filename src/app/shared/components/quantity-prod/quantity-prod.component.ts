import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from '../../../products/products.service';

@Component({
  selector: 'app-quantity-prod',
  templateUrl: './quantity-prod.component.html',
  styleUrls: ['./quantity-prod.component.scss']
})
export class QuantityProdComponent implements OnInit {
  @Input() updateProduct: any;
  qty: number;
  newQty: number;

  isRequesting: boolean = false;
  isShowingAlert: boolean = false;
  alertMessage: string = '';
  type: string = 'asdasd';

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
  }

  updateQty() {
    const updateData = {
      prod_name: this.updateProduct.prod.prod_code,
      action: this.updateProduct.action,
      quantity: this.qty
    }
    this.isRequesting = true;
    this.productService.updateProductQty(updateData).subscribe(
      resp => {
        this.isRequesting = false;
        (document.querySelector('#closeButton') as HTMLElement)?.click();
      }, error => {
        this.isRequesting = false;
        this.showAlert('Hubo un error al actualizar la cantidad del producto', 'alert-danger');
      }
    );
  }

  private showAlert(message: string, type: string) {
    this.isShowingAlert = true;
    this.alertMessage = message;
    this.type = type;
  }

}
