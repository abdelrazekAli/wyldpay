import { ProductType } from "../types/Product";

export const CustomBox = ({ product }: ProductType) => {
  return (
    <div className="box">
      <div className="image">
        <img src={`./assets/images/${product.img}`} alt="" />
      </div>
      <div className="content">
        <h3>{product.name}</h3>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "3rem",
        }}
      >
        <div className="price" style={{ fontSize: "2rem", color: "#130f40" }}>
          ${product.price.toFixed(2)}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              fontSize: "2.5rem",
              color: "#00bb67",
              lineHeight: 1,
              borderRadius: "4px",
              padding: "3px 7.5px",
              cursor: "pointer",
              border: "1px solid #00bb67",
            }}
          >
            -
          </div>
          <div style={{ color: "#1b003e", fontSize: "1.6rem" }}>2</div>
          <div
            style={{
              fontSize: "2.5rem",
              color: "#00bb67",
              lineHeight: 1,
              borderRadius: "4px",
              padding: "3px 6px",
              cursor: "pointer",
              border: "1px solid #00bb67",
            }}
          >
            +
          </div>
        </div>
      </div>
    </div>
  );
};
