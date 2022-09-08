export type ProductModel = {
  name: string;
  code: string;
  uri: string;
  ean: string;
  amount?: number;
  hasAvailableAmount?: boolean;
};