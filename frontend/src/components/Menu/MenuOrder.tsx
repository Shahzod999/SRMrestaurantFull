import FoodBox from "../FoodBox/FoodBox";
import { useState } from "react";
import "./menuOrder.scss";
import { useAppDispatch } from "../../hooks/hooks";
import { addOrderToFoodState, removeFoodfromOrder, removeOrderFoodList } from "../../features/orderedFoodSlice";
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
    toast.success("Order Sent");
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
              <button className="totallOrederAll" onClick={pathname == "/menu" ? handleSubmitOrders : handleOrderFinish}>
                {pathname == "/menu" ? <FaCheck /> : <IoCheckmarkDoneSharp />}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MenuOrder;
