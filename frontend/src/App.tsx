import "./App.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Menu from "./pages/Menu/Menu";
import GetOrder from "./pages/GetOrder/GetOrder";
import Header from "./components/Header/Header";
import Error from "./components/Error/Error";
import { useState, useEffect } from "react";
import SideBarMenu from "./components/SideBar/SideBarMenu";
import FoodTypes from "./components/FoodTypes/FoodTypes";
import { useDispatch, useSelector } from "react-redux";
import mainBack0 from "../public/mainBack0.jpg";
import mainBack1 from "../public/mainBack1.jpg";
import mainBack2 from "../public/mainBack2.jpg";
import mainBack3 from "../public/mainBack3.jpg";
import { fetchUser, selectedUserGetUser, selectedUserToken } from "./features/userLoginSlice";

const App = () => {
  const dispatch = useDispatch();
  const [back, setBack] = useState(0);
  const userToken = useSelector(selectedUserToken);
  const userInfo = useSelector(selectedUserGetUser);
  console.log(userInfo, "sdsds");

  const changeBack = () => {
    setBack((prev) => (prev == 3 ? 0 : prev + 1));
  };

  useEffect(() => {
    dispatch(fetchUser());
  }, [userToken]);

  const backgrounds = [mainBack0, mainBack1, mainBack2, mainBack3];

  return (
    <div className="wrapper" style={{ background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(${backgrounds[back]}) center` }}>
      <BrowserRouter>
        <SideBarMenu />
        <div className="blur">
          <Header changeBack={changeBack} userToken={userToken} userInfo={userInfo} />
          <Routes>
            {userToken ? (
              <>
                {userInfo?.userBoss && (
                  <>
                    <Route path="/" element={<Home />} />
                    <Route path="/edit" element={<Menu />} />
                  </>
                )}
                <Route path="/menu" element={<Menu />} />
                <Route path="/menu/goryach" element={<FoodTypes typeFood={"Горячая"} />} />
                <Route path="/menu/desert" element={<FoodTypes typeFood={"Десерт"} />} />
                <Route path="/menu/fastfood" element={<FoodTypes typeFood={"ФастФуд"} />} />
                <Route path="/menu/drinks" element={<FoodTypes typeFood={"Напитки"} />} />
                <Route path="/getOrder" element={<GetOrder />} />
                <Route path="*" element={<Error />} />
              </>
            ) : (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </>
            )}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
