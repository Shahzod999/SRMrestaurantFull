import AddNewFoodEditForm from "../../components/AddnewFoodEditForm/AddNewFoodEditForm";
import "./home.scss";
import { useState } from "react";

const Home = () => {
  const [error, setError] = useState("");

  return (
    <div className="home">
      <h2>Add New Food</h2>
      <AddNewFoodEditForm mode="add" setError={setError} />
      {error}
    </div>
  );
};

export default Home;
