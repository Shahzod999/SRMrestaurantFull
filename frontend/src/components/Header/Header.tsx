import "./header.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { User, handleTokenUserLogOut } from "../../features/userLoginSlice";

interface HeaderProps {
  // token: string;
  userToken: string | null;
  userInfo: User | undefined;
}

const Header: React.FC<HeaderProps> = ({ userToken, userInfo }) => {
  // const getUser = useSelector(selectedUserGetUser);

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
        <nav>
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

            <li>{userInfo?.fullName}</li>
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
