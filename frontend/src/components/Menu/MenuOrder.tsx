import FoodBox from "../FoodBox/FoodBox";
import { useState } from "react";
import "./menuOrder.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addOrderToFoodState, removeFoodfromOrder, removeOrderFoodList, selectedGuestTable } from "../../features/orderedFoodSlice";
import { useLocation } from "react-router-dom";
import GuestTable from "./GuestTable";
import toast from "react-hot-toast";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { GrClear } from "react-icons/gr";

interface Food {
  _id: string;
  name: string;
  price: string;
  desc: string;
  amount?: number;
  type: string;
  portion: number;
}

const MenuOrder = ({ foods }: { foods: Food[] }) => {
  const dispatch = useAppDispatch();
  const [orders, setOrders] = useState<Food[]>([]);
  const { pathname } = useLocation();
  const table = useAppSelector(selectedGuestTable);

  const handleUpdateOrder = (updatedFood: Food) => {
    setOrders((prevOrders) => {
      if (updatedFood.amount === 0) {
        // Удаляем еду из временного хранилища а затем и из основного хранилища
        console.log(updatedFood);
        dispatch(removeFoodfromOrder(updatedFood));

        return prevOrders.filter((order) => order._id !== updatedFood._id);
      }
      const existingOrderIndex = prevOrders.findIndex((order) => order._id === updatedFood._id && order.portion === updatedFood.portion);

      if (existingOrderIndex !== -1) {
        const updatedOrders = [...prevOrders];
        updatedOrders[existingOrderIndex] = updatedFood;
        return updatedOrders;
      }
      return [...prevOrders, updatedFood];
    });
  };

  const handleSubmitOrders = () => {
    if (!table) {
      return toast.error("Table", {
        position: "bottom-center",
      });
    }

    orders.forEach((order) => dispatch(addOrderToFoodState(order)));
  };

  const handleOrderFinish = async () => {
    await handleSubmitOrders();
    window.print();
    toast.success("Order Sent");
    dispatch(removeOrderFoodList());
  };

  const handleClearOrder = () => {
    dispatch(removeOrderFoodList());
  };

  return (
    <>
      <div className="getOrder__holder">
        {foods?.map((food, index) => (
          <FoodBox food={food} key={food._id + index} onUpdateOrder={handleUpdateOrder} foodAmount={food.amount} foodPortion={food.portion} />
        ))}
      </div>

      {pathname !== "/edit" && (
        <>
          <GuestTable />
          <div className="getOrder__holder__buttons">
            {pathname == "/getOrder" && (
              <>
                <div className="getOrder__holder__buttons__button delete">
                  <button className="totallOrederAll" onClick={handleClearOrder}>
                    <GrClear />
                  </button>
                </div>
              </>
            )}

            <div className="getOrder__holder__buttons__button">
              {pathname == "/menu" ? (
                <>
                  <button className="totallOrederAll" onClick={handleSubmitOrders}>
                    <span>Order</span>
                    <FaCheck />
                  </button>
                </>
              ) : (
                <>
                  {foods.length > 0 && (
                    <button className="totallOrederAll" onClick={handleOrderFinish}>
                      <span>Print</span>
                      <IoCheckmarkDoneSharp />
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MenuOrder;
