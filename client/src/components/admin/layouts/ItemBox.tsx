import "../../../styles/item.sass";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
      <div className="item-icons">
        <FontAwesomeIcon
          icon={faTrash}
          className="icon icon-delete"
          onClick={() => onDelete(item._id)}
        />

        <FontAwesomeIcon
          icon={faPenToSquare}
          className="icon icon-edit"
          onClick={() => onDelete(item._id)}
        />
      </div>
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
