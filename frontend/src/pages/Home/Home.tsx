import AddNewFoodEditForm from "../../components/AddnewFoodEditForm/AddNewFoodEditForm";
import "./home.scss";
import { useState } from "react";

const Home = () => {
  const [error, setError] = useState<string>("");

  const handleAddFood = (data: { name: string; price: string; desc: string }) => {
    console.log("Food added:", data);
  };

  return (
    <div className="home">
      <h2>Add New Food</h2>
      <AddNewFoodEditForm mode="add" setError={setError} onSubmit={handleAddFood} />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Home;
