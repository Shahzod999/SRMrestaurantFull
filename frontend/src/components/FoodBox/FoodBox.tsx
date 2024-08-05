import { useState } from "react";
import "./foodBox.scss";
import { useDispatch } from "react-redux";
import { addOrderToFoodState } from "../../features/orderedFoodSlice";
import { MdDeleteForever } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { fetchAllFoods } from "../../features/getAllFoodsSlice";
import { GrEdit } from "react-icons/gr";
import AddNewFoodEditForm from "../AddnewFoodEditForm/AddNewFoodEditForm";
import axiosInstance from "../../utils/axiosInstance";

const FoodBox = ({ food }) => {
  const BASE_URL = "http://localhost:8000";
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const [amount, setFoodAmount] = useState(food.amount ? food.amount : 0);
  const [stolik, setStolikAmount] = useState(food.stolik ? food.stolik : 0);
  const [edit, setEdit] = useState(false);

  const handleFoodDecrement = () => {
    setFoodAmount((prevAmount) => Math.max(prevAmount - 1, 0));
  };

  const handleFoodIncrement = () => {
    setFoodAmount((prevAmount) => prevAmount + 1);
  };

  const handleStolikDecrement = () => {
    setStolikAmount((prevAmount) => Math.max(prevAmount - 1, 0));
  };

  const handleStolikIncrement = () => {
    setStolikAmount((prevAmount) => prevAmount + 1);
  };

  const sendOrder = () => {
    dispatch(addOrderToFoodState({ ...food, amount, stolik }));
  };

  const handleDeleteFood = async () => {
    try {
      const response = await axiosInstance.delete(`${BASE_URL}/delete-food/${food._id}`);
      console.log(response.data, "delete");
      dispatch(fetchAllFoods());
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditFood = async (data) => {
    const { name, price, desc } = data;
    try {
      const response = await axiosInstance.put("/edit-food/" + food._id, {
        name,
        price,
        desc,
      });
      dispatch(fetchAllFoods());
      setEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="foodBox">
      {pathname === "/edit" && (
        <div className="foodBox__editDelete">
          <MdDeleteForever className="icon" onClick={handleDeleteFood} />
          <GrEdit className="icon" onClick={() => setEdit(!edit)} />
        </div>
      )}

      {edit ? (
        <AddNewFoodEditForm mode="edit" initialValues={{ name: food.name, price: food.price, desc: food.desc }} setError={() => {}} onSubmit={(data) => handleEditFood(data)} />
      ) : (
        <>
          <h2>{food.name}</h2>
          <strong>{food.price}</strong>
          <span>{food.desc}</span>
          <div className="counter amount">
            <button className="decrement" onClick={handleFoodDecrement}>
              -
            </button>
            <span className="number">{amount}</span>
            <button className="increment" onClick={handleFoodIncrement}>
              +
            </button>
          </div>

          <div className="counter stolik">
            <button className="decrement" onClick={handleStolikDecrement}>
              -
            </button>
            <span className="number">{stolik}</span>
            <button className="increment" onClick={handleStolikIncrement}>
              +
            </button>
          </div>

          <button className="order" onClick={sendOrder}>
            Order
          </button>
        </>
      )}
    </div>
  );
};

export default FoodBox;
