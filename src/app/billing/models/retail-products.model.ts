export interface RetailProducts {
  prod_name: string;
  cant: number;
  price: number;
  total: number;
  isTaxed: boolean;
  tax?: number;
}
