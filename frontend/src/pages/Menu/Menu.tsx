import { useEffect } from "react";
import "./menu.scss";
import { fetchAllFoods, selectedAllFoods } from "../../features/getAllFoodsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import MenuOrder from "../../components/Menu/MenuOrder";

const Menu = () => {
  const dispatch = useAppDispatch();
  const foods = useAppSelector(selectedAllFoods);

  useEffect(() => {
    dispatch(fetchAllFoods());
  }, [dispatch]);

  const handleOrderFinish = () => {
    console.log("default delete ");
  };

  return <MenuOrder foods={foods} orderFuction={handleOrderFinish} text="Send order" />;
};

export default Menu;
