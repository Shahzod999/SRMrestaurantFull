import axiosInstance from "../../utils/axiosInstance";
import { useState } from "react";
import "./addNewFoodEditForm.scss";

interface AddNewFoodEditFormProps {
  mode: "add" | "edit";
  initialValues?: {
    name?: string;
    price?: string;
    desc?: string;
    type?: string;
  };
  setError: (error: string) => void;
  onSubmit: (data: { name: string; price: string; desc: string; type: string }) => void;
}

const AddNewFoodEditForm: React.FC<AddNewFoodEditFormProps> = ({ mode, initialValues = {}, setError, onSubmit }) => {
  const [name, setName] = useState<string>(initialValues.name || "");
  const [price, setPrice] = useState<string>(initialValues.price || "");
  const [desc, setDesc] = useState<string>(initialValues.desc || "");
  const [type, setType] = useState<string>(initialValues.type || "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (mode === "add") {
        const response = await axiosInstance.post("/add-food", { name, price, desc, type });
        if (response.data && !response.data.error) {
          setName("");
          setPrice("");
          setDesc("");
          setType("");
        } else {
          setError("Failed to add food");
        }
      } else {
        onSubmit({ name, price, desc, type });
      }
    } catch (error: any) {
      console.log("Error response:", error.response);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="addNewFoodForm">
      <input type="text" value={name} placeholder="name" onChange={(e) => setName(e.target.value)} required />
      <input type="text" value={price} placeholder="price" onChange={(e) => setPrice(e.target.value)} required />
      <input type="text" value={desc} placeholder="desc" onChange={(e) => setDesc(e.target.value)} required />

      {/* Drop-down menu для выбора типа */}
      <select value={type} onChange={(e) => setType(e.target.value)} required>
        <option value="" disabled>
          Select type
        </option>
        <option value="Starters">Starters</option>
        <option value="Dessert">Dessert</option>
        <option value="FastFood">FastFood</option>
        <option value="Drinks">Drinks</option>
      </select>
      {/*  */}

      <button type="submit">{mode === "add" ? "Add New Food" : "Edit Food"}</button>
    </form>
  );
};

export default AddNewFoodEditForm;
