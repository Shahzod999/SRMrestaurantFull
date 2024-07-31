import "./header.scss";
import { Link } from "react-router-dom";

const Header = ({ changeBack }: { changeBack: () => void }) => {
  const status = false;
  return (
    <header>
      <div className="container headerWrapper">
        <nav onClick={changeBack}>
          <ul>
            <li>
              <Link to="/menu">Меню</Link>
            </li>
            <li>
              <Link to="/getOrder">Принять Заказ</Link>
            </li>
            <li>
              <Link to="/login">
                <button>{status ? "LOGIN" : "SIGN-UP"}</button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
