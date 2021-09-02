export interface RetailProducts {
  prod: string;
  cant: number;
  price: number;
  total: number;
  isTaxed: boolean;
  tax?: number;
}
