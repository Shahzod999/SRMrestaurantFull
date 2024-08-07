import { removeOrderFoodList, selectedOrderedFoods } from "../../features/orderedFoodSlice";
import FoodBox from "../../components/FoodBox/FoodBox";
import "./getOrder.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";




const GetOrder = () => {
  const dispatch = useAppDispatch();
  let orderedFoods = useAppSelector(selectedOrderedFoods);

  console.log(orderedFoods, "all");

  const handleOrderFinish = () => {
    dispatch(removeOrderFoodList());
    window.print();
  };

  return (
    <div className="getOrder">
      <div className="getOrder__holder">
        {orderedFoods.map((food, index) => (
          <FoodBox food={food} key={index} />
        ))}
      </div>
      <div className="getOrder__button">
        <button className="totallOrederAll" onClick={handleOrderFinish}>
          ZAKAZ
        </button>
      </div>

      <div className="printable-receipt">
        <h2>Receipt</h2>
        <hr />
        {orderedFoods.map((food, index) => (
          <div key={index}>
            <p>
              <strong>{food.name}</strong>
            </p>
            <p>Amount: {food.amount}</p>
            <p>Price: {food.price}</p>
            <p>Table: {food.stolik}</p>
            <p>Description: {food.desc}</p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetOrder;
