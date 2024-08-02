import { selectedOrderedFoods } from "../../features/orderedFoodSlice";
import { useSelector, useDispatch } from "react-redux";

import "./getOrder.scss";
import FoodBox from "../../components/FoodBox/FoodBox";

const GetOrder = () => {
  const orderedFoods = useSelector(selectedOrderedFoods);
  console.log(orderedFoods);

  return (
    <div className="getOrder">
      <div className="getOrder__holder">
        {orderedFoods.map((food, index) => (
          <FoodBox food={food} key={index} />
        ))}
      </div>
    </div>
  );
};

export default GetOrder;
