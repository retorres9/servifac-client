export class SaleInfo {
  sale_id:           number;
  sale_totalRetail:  string;
  sale_totalPayment: string;
  sale_date:         Date;
  sale_client:       SaleClient;
  sale_maxDate?:     Date;
  sale_delay?:        number;
}

export interface SaleClient {
  cli_firstName: string;
}
