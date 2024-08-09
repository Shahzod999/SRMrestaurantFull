import FoodBox from "../FoodBox/FoodBox";
import { useState, useEffect } from "react";
import "./menuOrder.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addOrderToFoodState, selectedGuestTable, tableChoose } from "../../features/orderedFoodSlice";
import { useLocation } from "react-router-dom";

interface Food {
  _id: string;
  name: string;
  price: string;
  desc: string;
  amount?: number;
}

const MenuOrder = ({ foods, orderFuction, text }: { foods: Food[]; orderFuction: () => void; text: string }) => {
  const dispatch = useAppDispatch();
  const choosenTable = useAppSelector(selectedGuestTable);
  const [guestTable, setGuestTableAmount] = useState<number>(choosenTable || 0);
  const [orders, setOrders] = useState<Food[]>([]);
  const { pathname } = useLocation();

  //stolik
  useEffect(() => {
    setGuestTableAmount(choosenTable || 0);
  }, [choosenTable]);

  const handleGuestTableDecrement = () => {
    setGuestTableAmount((prevAmount) => Math.max(prevAmount - 1, 0));
  };

  const handleGuestTableIncrement = () => {
    setGuestTableAmount((prevAmount) => prevAmount + 1);
  };

  const handleGuestTable = () => {
    dispatch(tableChoose(guestTable));
  };
  //stolik end

  const handleUpdateOrder = (updatedFood: Food) => {
    setOrders((prevOrders) => {
      const existingOrderIndex = prevOrders.findIndex((order) => order._id === updatedFood._id);
      if (existingOrderIndex >= 0) {
        const updatedOrders = [...prevOrders];
        updatedOrders[existingOrderIndex] = updatedFood;
        return updatedOrders;
      }
      return [...prevOrders, updatedFood];
    });
  };

  const handleSubmitOrders = () => {
    orders.forEach((order) => dispatch(addOrderToFoodState(order)));
  };

  return (
    <>
      <div className="getOrder__holder">
        {foods?.map((food, index) => (
          <FoodBox food={food} key={index} onUpdateOrder={handleUpdateOrder} />
        ))}
      </div>

      <div className="getOrder">
        <div className="counter guestTable">
          <button className="decrement" onClick={handleGuestTableDecrement}>
            -
          </button>
          <span className="number">{guestTable}</span>
          <button className="increment" onClick={handleGuestTableIncrement}>
            +
          </button>

          <button onClick={handleGuestTable}>{pathname == "/menu" ? "set Table" : "change Table"}</button>
        </div>
      </div>

      <div className="getOrder__button">
        <button className="totallOrederAll" onClick={pathname == "/menu" ? handleSubmitOrders : orderFuction}>
          {text}
        </button>
      </div>
    </>
  );
};

export default MenuOrder;
