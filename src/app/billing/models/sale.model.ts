import { Prods } from "../billing.component";

export class Sale {
  sale: Prods[];
  sale_totalRetail: number;
  sale_totalPayment: number;
  sale_date: Date;
  sale_user: string;
  sale_client: string;
}
