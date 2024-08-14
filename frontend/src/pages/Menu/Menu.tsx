import { useEffect } from "react";
import "./menu.scss";
import { fetchAllFoods, selectedAllFoods } from "../../features/getAllFoodsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import MenuOrder from "../../components/Menu/MenuOrder";

const Menu = () => {
  const dispatch = useAppDispatch();
  const foods = useAppSelector(selectedAllFoods);
  console.log(foods,'mi tut');
  
  //тут мы

  useEffect(() => {
    dispatch(fetchAllFoods());
  }, [dispatch]);

  return <MenuOrder foods={foods} />;
};

export default Menu;
