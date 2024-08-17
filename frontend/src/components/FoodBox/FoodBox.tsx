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
import { RiArrowDropDownLine } from "react-icons/ri";

interface Food {
  _id: string;
  name: string;
  price: string;
  desc: string;
  amount?: number;
  type: string;
  portion: number;
}

interface FoodBoxProps {
  food: Food;
  onUpdateOrder: (food: Food) => void;
  foodAmount: number | undefined;
  foodPortion: number;
}
const FoodBox: React.FC<FoodBoxProps> = ({ food, onUpdateOrder, foodAmount, foodPortion }) => {
  console.log(foodAmount, foodPortion, "amoutportion");

  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const orderedFoods = useAppSelector(selectedOrderedFoods) as Food[];
  const [edit, setEdit] = useState<boolean>(false);
  const [dropDownFoodBox, setDropDownFoodBox] = useState<boolean>(false);
  const [selectedPortion, setSelectedPortion] = useState<number>(foodPortion || 1); // Default selected option

  let orederFood = orderedFoods.find((item) => item._id == food._id && item.portion == selectedPortion);
  const [amount, setFoodAmount] = useState<number>(foodAmount || 0);

  useEffect(() => {
    if (orederFood?.portion) {
      setSelectedPortion(orederFood.portion);
    }
  }, [orederFood]);

  useEffect(() => {
    setFoodAmount(orederFood?.amount || 0);
  }, [selectedPortion]);

  const handleOptionChange = (event: number) => {
    setSelectedPortion(() => {
      requestAnimationFrame(() => onUpdateOrder({ ...food, portion: event }));
      return event;
    }); // Update selected portion
    setDropDownFoodBox(false);
  };

  const handleFoodAmountChange = (delta: number) => {
    setFoodAmount((prevAmount) => {
      const newAmount = Math.max(prevAmount + delta, 0);
      requestAnimationFrame(() => onUpdateOrder({ ...food, amount: newAmount, portion: selectedPortion }));
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

  const handleEditFood = async (data: { name: string; price: string; desc: string; type: string }) => {
    const { name, price, desc, type } = data;
    try {
      const response = await axiosInstance.put("/edit-food/" + food._id, {
        name,
        price,
        desc,
        type,
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
        <AddNewFoodEditForm mode="edit" initialValues={{ name: food.name, price: food.price, desc: food.desc, type: food.type }} setError={() => {}} onSubmit={(data) => handleEditFood(data)} />
      ) : (
        <>
          <div className="foodBox__picturePlace">
            <img src="noPic.jpg" alt="" />
          </div>
          <div className="foodBox__name">
            <span>{food.type}</span>
            <h2>{food.name}</h2>
            <p>{food.desc}</p>
          </div>

          <div className="foodBox__dropDown">
            <div
              onClick={() => {
                if (pathname !== "/getOrder") {
                  setDropDownFoodBox(!dropDownFoodBox);
                }
              }}
              className={`foodBox__dropDown__selected ${pathname !== "/getOrder" ? "cursor" : "noncursor"}`}>
              <span>{selectedPortion}</span>

              <RiArrowDropDownLine className={`${dropDownFoodBox ? "foodBox__dropDown__selected__open" : ""} foodBox__dropDown__selected__drop`} />
            </div>
            {dropDownFoodBox && (
              <>
                <div className="foodBox__dropDown__options">
                  <span onClick={() => handleOptionChange(0.5)}>0.5</span>
                  <span onClick={() => handleOptionChange(0.75)}>0.75</span>
                  <span onClick={() => handleOptionChange(1)}>1</span>
                  <span onClick={() => handleOptionChange(1.25)}>1.25</span>
                </div>
              </>
            )}
          </div>

          <div className="foodBox__buttons">
            <strong>
              {selectedPortion * Number(food.price)} <span>x1</span>
            </strong>
            <div className="counter amount">
              <button className="decrement" onClick={() => handleFoodAmountChange(-1)}>
                -
              </button>
              <span className="number">{amount}</span>
              <button className="increment" onClick={() => handleFoodAmountChange(1)}>
                +
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FoodBox;
