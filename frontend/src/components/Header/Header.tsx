import "./header.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleTokenUserLogOut, selectedUserGetUser } from "../../features/userLoginSlice";

interface HeaderProps {
  changeBack: () => void;
  // token: string;
  userToken: string | null;
}

const Header: React.FC<HeaderProps> = ({ changeBack, userToken }) => {
  const getUser = useSelector(selectedUserGetUser);

  const dispatch = useDispatch();

  const handleHeaderLogin = () => {
    if (userToken) {
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
              <Link to="/">Add New Food</Link>
            </li>
            <li>
              <Link to="/edit">Edit Menu</Link>
            </li>
          </ul>

          <ul>
            
            <li>
              <Link to="/menu">Меню</Link>
            </li>
            <li>
              <Link to="/getOrder">Принятые Заказ</Link>
            </li>
            

            <li>{getUser ? getUser.fullName : ""}</li>
            <li>
              <button onClick={handleHeaderLogin}>{userToken ? "SIGN-OUT" : "LOGIN"}</button>
            </li>
            
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
