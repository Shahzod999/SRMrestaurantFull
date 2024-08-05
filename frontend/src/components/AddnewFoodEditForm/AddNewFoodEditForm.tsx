import axiosInstance from "../../utils/axiosInstance";
import { useState } from "react";
import "./addNewFoodEditForm.scss";

const AddNewFoodEditForm = ({ mode, initialValues = {}, setError, onSubmit }) => {
  
  const [name, setName] = useState(initialValues.name || "");
  const [price, setPrice] = useState(initialValues.price || "");
  const [desc, setDesc] = useState(initialValues.desc || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "add") {
        const response = await axiosInstance.post("/add-food", { name, price, desc });
        if (response.data && !response.data.error) {
          setName("");
          setPrice("");
          setDesc("");
        } else {
          setError("Failed to add food");
        }
      } else {
        onSubmit({ name, price, desc });
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
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} placeholder="name" onChange={(e) => setName(e.target.value)} required />
      <input type="text" value={price} placeholder="price" onChange={(e) => setPrice(e.target.value)} required />
      <input type="text" value={desc} placeholder="desc" onChange={(e) => setDesc(e.target.value)} required />
      <button type="submit">{mode === "add" ? "Add New Food" : "Edit Food"}</button>
    </form>
  );
};

export default AddNewFoodEditForm;
