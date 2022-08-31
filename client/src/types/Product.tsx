export type ProductType = {
  product: {
    id: number;
    img: string;
    name: string;
    price: number;
    category: string;
  };
};

type CartType = {
  product: {
    quantity: number;
  };
};

export type CartProductType = ProductType & CartType;
