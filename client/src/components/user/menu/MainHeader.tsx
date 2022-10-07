import "../../../styles/menu/header.sass";

export const MainHeader = () => {
  return (
    <div className="header-wrapper">
      <div
        className="menu-header"
        style={{
          backgroundImage: `url(../../assets/images/simple-background.png)`,
        }}
      >
        <div className="logo">
          <img src={`../../assets/images/simple-logo.svg`} alt="" />
        </div>
      </div>
    </div>
  );
};
