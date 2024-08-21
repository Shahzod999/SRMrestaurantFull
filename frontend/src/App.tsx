import "./App.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Menu from "./pages/Menu/Menu";
import GetOrder from "./pages/GetOrder/GetOrder";
import Header from "./components/Header/Header";
import Error from "./components/Error/Error";
import { useEffect } from "react";
import FoodTypes from "./components/FoodTypes/FoodTypes";
import { fetchUser, selectedLoadingToken, selectedUserGetUser, selectedUserToken } from "./features/userLoginSlice";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import Loading from "./components/Loading/Loading";
import Kitchen from "./pages/Kitchen/Kitchen";

const App = () => {
  const dispatch = useAppDispatch();
  const userToken = useAppSelector(selectedUserToken);
  const userInfo = useAppSelector(selectedUserGetUser);
  const loading = useAppSelector(selectedLoadingToken);

  useEffect(() => {
    dispatch(fetchUser());
  }, [userToken]);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Header userToken={userToken} userInfo={userInfo} />
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
              <Route path="/kitchen" element={<Kitchen />} />
              <Route path="*" element={<Error />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
