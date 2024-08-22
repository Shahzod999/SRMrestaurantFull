import { selectedTotalCheck } from "../../features/orderedFoodSlice";
import { useAppSelector } from "../../hooks/hooks";
import "./kitchen.scss";

const Kitchen = () => {
  const totalCheck = useAppSelector(selectedTotalCheck);
  console.log(totalCheck, "total");

  return (
    <div className="container kitchen">
      {Object.keys(totalCheck).map((type) => (
        <div key={type} className="kitchen__box">
          <h3>{type}</h3>
          <div className="kitchen__box__list">
            {totalCheck[type].map((food, index) => (
              <ul key={food._id + food.portion + index}>
                <li>
                  <span className="foodInfoKitchen">{food.name}</span>
                </li>
                <li>
                  <span>miqdor: </span>
                  <span className="foodInfoKitchen">{food.amount}</span>
                </li>
                <li>
                  <span>portion: </span>
                  <span className="foodInfoKitchen">{food.portion}</span>
                </li>
                <li>
                  <span>time: {food.orderTime && new Date(food.orderTime).toLocaleString()}</span>
                </li>
                <li>
                  <span>
                    table: {food.table?.place} №:{food.table?.table}
                  </span>
                </li>
                <li>
                  <strong className="foodInfoKitchen">{food.price * food.portion * food.amount} UZS</strong>
                </li>
              </ul>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Kitchen;
