import FoodBox from "../FoodBox/FoodBox";
import { useState, useEffect } from "react";
import "./menuOrder.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addOrderToFoodState, removeOrderFoodList, selectedGuestTable, tableChoose } from "../../features/orderedFoodSlice";
import { useLocation } from "react-router-dom";
import GuestTable from "./GuestTable";

interface Food {
  _id: string;
  name: string;
  price: string;
  desc: string;
  amount?: number;
}

const MenuOrder = ({ foods }: { foods: Food[] }) => {
  const dispatch = useAppDispatch();
  const [orders, setOrders] = useState<Food[]>([]);
  const { pathname } = useLocation();

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

  const handleOrderFinish = async () => {
    await handleSubmitOrders();
    dispatch(removeOrderFoodList());
    window.print();
  };

  const handleClearOrder = () => {
    dispatch(removeOrderFoodList());
  };

  return (
    <>
      <div className="getOrder__holder">
        {foods?.map((food, index) => (
          <FoodBox food={food} key={index} onUpdateOrder={handleUpdateOrder} />
        ))}
      </div>

      {pathname !== "/edit" && (
        <>
          <GuestTable />

          <div className="getOrder__button">
            <button className="totallOrederAll" onClick={pathname == "/menu" ? handleSubmitOrders : handleOrderFinish}>
              {pathname == "/menu" ? "Send order" : "Zakaz"}
            </button>
          </div>

          {pathname == "/getOrder" && (
            <>
              <div className="getOrder__button delete">
                <button className="totallOrederAll" onClick={handleClearOrder}>
                  Clear
                </button>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default MenuOrder;
