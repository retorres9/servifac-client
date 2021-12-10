export class Purchases {
  pur_id:      number;
  pur_amount:  string;
  pur_paid:    string;
  pur_date:    Date;
  pur_maxDate: Date;
  pur_info:    string;
  provider:    Provider;
}

export interface Provider {
  prov_ruc:           string;
  prov_name:          string;
  prov_accountName:   string;
  prov_accountType:   string;
  prov_accountNumber: string;
  prov_debt:          string;
  prov_phone:         string;
  prov_isActive:      boolean;
}
