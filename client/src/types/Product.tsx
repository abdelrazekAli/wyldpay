export type ProductType = {
  id: number;
  img: string;
  name: string;
  price: number;
  category: string;
};

export type ProductPropType = {
  product: ProductType;
};

type CartType = {
  product: {
    quantity: number;
  };
};

export type CartProductType = ProductPropType & CartType;
