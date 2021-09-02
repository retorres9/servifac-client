import { RetailProducts } from "./retail-products.model";

export class Sale {
  sale: RetailProducts[];
  sale_totalRetail: number;
  sale_totalPayment: number;
  sale_date: Date;
  sale_user: string;
  sale_client: string;
}
