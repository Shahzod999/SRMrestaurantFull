import axiosInstance from "../../utils/axiosInstance";
import "./home.scss";
import { useState } from "react";

const Home = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  console.log("Token from localStorage:", token);

  const addNewFoodToDb = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/add-food", {
        name,
        price,
        desc,
      });
      if (response.data && !response.data.error) {
        // обнуляем поля формы после успешного добавления
        setName("");
        setPrice("");
        setDesc("");
        // showToastMessage("Food added successfully");
      } else {
        setError("Failed to add food");
      }
    } catch (error) {
      console.log("Error response:", error.response);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred");
      }
    }
  };

  return (
    <div className="home">
      <h2>Add New Food</h2>
      <form onSubmit={addNewFoodToDb}>
        <input type="text" value={name} placeholder="name" onChange={(e) => setName(e.target.value)} />
        <input type="text" value={price} placeholder="price" onChange={(e) => setPrice(e.target.value)} />
        <input type="text" value={desc} placeholder="desc" onChange={(e) => setDesc(e.target.value)} />
        <button>Add New Food</button>
      </form>
      {error}
    </div>
  );
};

export default Home;
