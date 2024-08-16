import { useEffect } from "react";
import "./menu.scss";
import { fetchAllFoods, selectedAllFoods, selectedAllFoodsError, selectedAllFoodsLoading } from "../../features/getAllFoodsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import MenuOrder from "../../components/Menu/MenuOrder";
import Error from "../../components/Error/Error";
import SideBarMenu from "../../components/SideBar/SideBarMenu";
import Loading from "../../components/Loading/Loading";
import OrderedFoodMainLine from "../../components/OrderedFoodMainLine/OrderedFoodMainLine";

const Menu = () => {
  const dispatch = useAppDispatch();
  const foods = useAppSelector(selectedAllFoods);
  const error = useAppSelector(selectedAllFoodsError);
  const loading = useAppSelector(selectedAllFoodsLoading);

  //тут мы

  useEffect(() => {
    dispatch(fetchAllFoods());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return (
      <div className="container">
        <SideBarMenu />
        <Error />
      </div>
    );
  }

  return (
    <main className="container mainMenu">
      <p className="mainMenu__orderLine">Order line</p>

      <OrderedFoodMainLine />

      <p className="mainMenu__orderLine">Foodies menu</p>
      <SideBarMenu />
      <div>
        <MenuOrder foods={foods} />
      </div>
    </main>
  );
};

export default Menu;
