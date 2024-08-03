import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FoodBox from "../../components/FoodBox/FoodBox";

import "./menu.scss";
import { fetchAllFoods, selectedAllFoods } from "../../features/getAllFoodsSlice";
const Menu = () => {
  const arr = [
    {
      name: "shorva",
      price: "10.000",
      oficiant: "Sher",
      amount: 0,
      stolik: 0,
      id: 1,
    },
    {
      name: "lavash",
      price: "12.000",
      oficiant: "Sher",
      amount: 0,
      stolik: 0,
      id: 2,
    },
    {
      name: "somsa",
      price: "5.000",
      oficiant: "Sher",
      amount: 0,
      stolik: 0,
      id: 3,
    },
    {
      name: "shorva",
      price: "10.000",
      oficiant: "Sher",
      amount: 0,
      stolik: 0,
      id: 4,
    },
    {
      name: "lavash",
      price: "12.000",
      oficiant: "Sher",
      amount: 0,
      stolik: 0,
      id: 5,
    },
    {
      name: "somsa",
      price: "5.000",
      oficiant: "Sher",
      amount: 0,
      stolik: 0,
      id: 6,
    },
  ];
  const dispatch = useDispatch();
  const foods = useSelector(selectedAllFoods);
  console.log(foods, "in");

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
