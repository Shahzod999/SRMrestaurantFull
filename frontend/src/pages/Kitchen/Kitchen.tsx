import { selectedTotalCheck } from "../../features/orderedFoodSlice";
import { useAppSelector } from "../../hooks/hooks";

const Kitchen = () => {
  const totalCheck = useAppSelector(selectedTotalCheck);
  console.log(totalCheck,'total');
  

  return (
    <div className="container">
      {Object.keys(totalCheck).map((type) => (
        <div key={type}>
          <h3>{type}</h3>
          <ul>
            {totalCheck[type].map((food, index) => (
              <li key={food._id + food.portion + index}>
                {food.name} - {food.price} UZS - miqdor: {food.amount} - portion: {food.portion} - table: {food.table?.place} №:{food.table?.table} - time: {food.orderTime && new Date(food.orderTime).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Kitchen;
