export type ProductType = {
  _id: number;
  img: string;
  name: string;
  price: number;
  category: string;
  desc: string;
  quantity?: number;
  ingredients?: string;
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
