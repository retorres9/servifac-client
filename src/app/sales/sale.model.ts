export interface Sale {
  sale_id:           number;
  sale_totalRetail:  string;
  sale_totalPayment: string;
  sale_date:         Date;
  sale:              SaleElement[];
}

export interface SaleElement {
  sdt_id:        number;
  sdt_quantity:  number;
  sdt_salePrice: string;
  product:       Product;
}

export interface Product {
  prod_code: string;
  prod_name: string;
}
