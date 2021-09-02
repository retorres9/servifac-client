export interface Client {
  prod_name: string;
  prod_price: string;
  prod_isTaxed: boolean
}

export interface Location {
  loc_id: number;
  loc_name: string;
}

export interface Category {
  cat_id: number;
  cat_name: string;
}

export interface Provider {
  prov_ruc: string;
  prov_name: string;
}
