import { useState } from "react";
import "../../../styles/item.sass";
import { Item } from "../../../types/Item";
import { EditItemForm } from "../forms/EditItemForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

export const ItemBox = ({
  item,
  onDelete,
  onUpdate,
}: {
  item: Item;
  onDelete: (itemId: string) => void;
  onUpdate: (updatedItem: Item) => void;
}) => {
  const [isItemFormVisible, setItemFormVisible] = useState<boolean>(false);

  return (
    <>
      {isItemFormVisible && (
        <EditItemForm
          item={item}
          hideForm={() => setItemFormVisible(false)}
          onUpdate={(updatedItem) => onUpdate(updatedItem)}
        />
      )}
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
            onClick={() => setItemFormVisible(!isItemFormVisible)}
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
    </>
  );
};
