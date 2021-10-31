import { RetailProducts } from "./retail-products.model";
import { SaleType } from '../enums/sale-type.enum';
import { SaleState } from '../enums/sale-state.enum';

export class Sale {
  sale: RetailProducts[];
  sale_totalRetail: number;
  sale_totalPayment: number;
  sale_date: string;
  sale_user: string;
  sale_client: string;
  sale_paymentType: SaleType;
  sale_saleState: SaleState;
  sale_store: number;
  sale_toDate: Date;
}
