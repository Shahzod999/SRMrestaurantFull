import { useEffect, useState } from "react";
import "./foodBox.scss";
import { MdDeleteForever } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { fetchAllFoods } from "../../features/getAllFoodsSlice";
import { GrEdit } from "react-icons/gr";
import AddNewFoodEditForm from "../AddnewFoodEditForm/AddNewFoodEditForm";
import axiosInstance from "../../utils/axiosInstance";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { selectedOrderedFoods } from "../../features/orderedFoodSlice";

interface Food {
  _id: string;
  name: string;
  price: string;
  desc: string;
  amount?: number;
}

interface FoodBoxProps {
  food: Food;
  onUpdateOrder: (food: Food) => void;
}
const FoodBox: React.FC<FoodBoxProps> = ({ food, onUpdateOrder }) => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const orderedFoods = useAppSelector(selectedOrderedFoods) as Food[];
  let orederFood = orderedFoods.find((item) => item._id == food._id);

  const [amount, setFoodAmount] = useState<number>(orederFood?.amount ? orederFood.amount : 0);
  const [edit, setEdit] = useState<boolean>(false);

  const handleFoodIncrement = () => {
    setFoodAmount((prevAmount) => {
      const newAmount = prevAmount + 1;
      // Отложить обновление заказа до следующего рендера
      requestAnimationFrame(() => onUpdateOrder({ ...food, amount: newAmount }));
      //requestAnimationFrame указывает браузеру на то, что вы хотите произвести анимацию, и просит его запланировать перерисовку на следующем кадре анимации
      return newAmount;
    });
  };

  const handleFoodDecrement = () => {
    setFoodAmount((prevAmount) => {
      const newAmount = Math.max(prevAmount - 1, 0);
      requestAnimationFrame(() => onUpdateOrder({ ...food, amount: newAmount }));
      return newAmount;
    });
  };

  const handleDeleteFood = async () => {
    try {
      const response = await axiosInstance.delete(`${import.meta.env.VITE_BASE_URL}/delete-food/${food._id}`);
      console.log(response.data, "delete");
      dispatch(fetchAllFoods());
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditFood = async (data: { name: string; price: string; desc: string }) => {
    const { name, price, desc } = data;
    try {
      const response = await axiosInstance.put("/edit-food/" + food._id, {
        name,
        price,
        desc,
      });
      console.log(response);

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
        </>
      )}
    </div>
  );
};

export default FoodBox;
