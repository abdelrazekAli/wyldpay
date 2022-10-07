import "../../../styles/item.sass";

export const ItemBox = ({
  item,
  onDelete,
}: {
  item: {
    _id: string;
    name: string;
    price: number;
    img: string;
    category: string;
    desc: string;
    restaurantId: string;
  };
  onDelete: (itemId: string) => void;
}) => {
  return (
    <div className="box">
      <i className="fa fa-trash" onClick={() => onDelete(item._id)}></i>
      <h4>{item.name}</h4>
      {/* <div className="image">
        <img src={URL.createObjectURL(product.img)} alt="" />
      </div> */}
      {/* <div className="content">
        <div className="price">${product.price.toFixed(2)}</div>
      </div> */}
    </div>
  );
};
