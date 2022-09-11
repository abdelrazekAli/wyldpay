import "../../styles/item.sass";

export const Item = ({
  product,
  onDelete,
}: {
  product: {
    id: number;
    name: string;
    price: number;
    category: string;
    img: File;
  };
  onDelete: (id: number) => void;
}) => {
  return (
    <div className="box">
      <i className="fa fa-trash" onClick={() => onDelete(product.id)}></i>
      <h4>{product.name}</h4>
      {/* <div className="image">
        <img src={URL.createObjectURL(product.img)} alt="" />
      </div> */}
      {/* <div className="content">
        <div className="price">${product.price.toFixed(2)}</div>
      </div> */}
    </div>
  );
};
