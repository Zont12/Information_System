import clouds from "/clouds.svg";
import image from "/logo.svg";
import "./Header.css";

export default Header;
function Header() {
  return (
    <header>
      <img src={clouds} alt="" className="cloud cloud1" />
      <img src={clouds} alt="" className="cloud cloud3" />
      <div className="logo">
        <img src={image} alt="" className="imagelog" />
        <h3 className="text">Springfield IS</h3>
      </div>
      <img src={clouds} alt="" className="cloud cloud2" />
      <img src={clouds} alt="" className="cloud cloud4" />
    </header>
  );
}
