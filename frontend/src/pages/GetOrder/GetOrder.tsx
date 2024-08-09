import { removeOrderFoodList, selectedOrderedFoods } from "../../features/orderedFoodSlice";
import "./getOrder.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import MenuOrder from "../../components/Menu/MenuOrder";

interface Food {
  _id: string;
  name: string;
  price: string;
  desc: string;
  amount?: number;
}

const GetOrder = () => {
  const dispatch = useAppDispatch();
  const orderedFoods = useAppSelector(selectedOrderedFoods) as Food[];

  const handleOrderFinish = () => {
    dispatch(removeOrderFoodList());
    window.print();
  };

  return (
    <div className="getOrder">
      <MenuOrder foods={orderedFoods} orderFuction={handleOrderFinish} text="ZAKAZ" />

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
            <p>Description: {food.desc}</p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetOrder;
