import FoodBox from "../FoodBox/FoodBox";
import { useState } from "react";
import "./menuOrder.scss";
import { useAppDispatch } from "../../hooks/hooks";
import { addOrderToFoodState, removeFoodfromOrder, removeOrderFoodList } from "../../features/orderedFoodSlice";
import { useLocation } from "react-router-dom";
import GuestTable from "./GuestTable";

interface Food {
  _id: string;
  name: string;
  price: string;
  desc: string;
  amount?: number;
  type: string;
}

const MenuOrder = ({ foods }: { foods: Food[] }) => {
  const dispatch = useAppDispatch();
  const [orders, setOrders] = useState<Food[]>([]);
  const { pathname } = useLocation();

  const handleUpdateOrder = (updatedFood: Food) => {
    setOrders((prevOrders) => {
      if (updatedFood.amount === 0) {
        // Удаляем еду из временного хранилища а затем и из основного хранилища
        console.log(updatedFood);
        dispatch(removeFoodfromOrder(updatedFood));

        return prevOrders.filter((order) => order._id !== updatedFood._id);
      }
      const existingOrderIndex = prevOrders.findIndex((order) => order._id === updatedFood._id);

      if (existingOrderIndex !== -1) {
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
    window.print();
    dispatch(removeOrderFoodList());
  };

  const handleClearOrder = () => {
    dispatch(removeOrderFoodList());
  };

  return (
    <>
      <div className="getOrder__holder">
        {foods?.map((food) => (
          <FoodBox food={food} key={food._id} onUpdateOrder={handleUpdateOrder} />
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
