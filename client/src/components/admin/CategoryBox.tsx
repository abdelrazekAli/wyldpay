import { useState } from "react";
import { CategoryType } from "../../types/Category";

type Props = {
  cate: CategoryType;
  onClick: () => void;
};

export const CategoryBox = ({ cate, onClick }: Props) => {
  const [select, setSelect] = useState(cate.selected);
  return (
    <div
      className={select ? "box selected" : "box"}
      onClick={() => {
        onClick();
        setSelect(!select);
      }}
    >
      <h5>{cate.value}</h5>
    </div>
  );
};
