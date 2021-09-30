export class ProductBill {
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


export interface Product {
  prod_code:            string;
  prod_name:            string;
  prod_price:           string;
  prod_normalProfit:    string;
  prod_wholesaleProfit: string;
  prod_inStock:         boolean;
  prod_quantity:        number;
  prod_minQuantity:     number;
  prod_isTaxed:         boolean;
  category:             Category;
  location:             Location;
}

export interface Category {
  cat_id:   number;
  cat_name: string;
}

export interface Location {
  loc_id:   number;
  loc_name: string;
}

