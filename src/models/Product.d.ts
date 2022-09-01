export type ProductModel = {
  name: string;
  code: string;
  uri: string;
  ean: string;
};

export type ProductDetailsModel = {
  name: string;
  code: string;
  images: string[];
  ean: string;
  sizes: string[];
};
