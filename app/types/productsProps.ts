export interface ProductsProps {
  products:
    | {
        product_id: number;
        symbol: string;
      }[]
    | null;
  loading: boolean;
  error: boolean;
}
