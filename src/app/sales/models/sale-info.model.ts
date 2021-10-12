export interface SaleInfo {
  sale_id:           number;
  sale_totalRetail:  string;
  sale_totalPayment: string;
  sale_date:         Date;
  sale_client:       SaleClient;
}

export interface SaleClient {
  cli_firstName: string;
}
