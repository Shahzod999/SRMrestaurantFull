import { useEffect } from "react";
import FoodBox from "../../components/FoodBox/FoodBox";
import "./menu.scss";
import { fetchAllFoods, selectedAllFoods } from "../../features/getAllFoodsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

interface Food {
  _id: string;
  name: string;
  price: string;
  desc: string;
  amount?: number;
  stolik?: number;
}

const Menu = () => {
  const dispatch = useAppDispatch();
  const foods = useAppSelector(selectedAllFoods) as Food[];

  useEffect(() => {
    dispatch(fetchAllFoods());
  }, [dispatch]);

  return (
    <div className="menu container">
      <div className="menu__holder">
        {foods?.map((food, index) => (
          <FoodBox food={food} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Menu;
