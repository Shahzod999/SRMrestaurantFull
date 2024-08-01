import "./header.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleTokenUserLogOut, userInfo } from "../../features/userLoginSlice";

interface HeaderProps {
  changeBack: () => void;
  // token: string;
  userInfo: userInfo | null;
}

const Header: React.FC<HeaderProps> = ({ changeBack, userInfo }) => {
  const dispatch = useDispatch();

  const handleHeaderLogin = () => {
    if (userInfo) {
      return dispatch(handleTokenUserLogOut());
    }
    return;
  };

  return (
    <header>
      <div className="container headerWrapper">
        <nav onClick={changeBack}>
          <ul>
            <li>
              <Link to="/menu">Меню</Link>
            </li>
            <li>
              <Link to="/getOrder">Принятые Заказ</Link>
            </li>
            <li>{userInfo ? userInfo.fullname : ""}</li>
            <li>
              <button onClick={handleHeaderLogin}>{userInfo ? "SIGN-OUT" : "LOGIN"}</button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
