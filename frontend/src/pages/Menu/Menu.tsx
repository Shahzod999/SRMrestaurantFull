import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FoodBox from "../../components/FoodBox/FoodBox";

import "./menu.scss";
import { fetchAllFoods, selectedAllFoods } from "../../features/getAllFoodsSlice";
const Menu = () => {
  const dispatch = useDispatch();
  const foods = useSelector(selectedAllFoods);

  useEffect(() => {
    dispatch(fetchAllFoods());
  }, []);

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
