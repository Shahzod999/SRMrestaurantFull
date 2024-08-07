import axiosInstance from "../../utils/axiosInstance";
import { useState } from "react";
import "./addNewFoodEditForm.scss";

interface AddNewFoodEditFormProps {
  mode: "add" | "edit";
  initialValues?: {
    name?: string;
    price?: string;
    desc?: string;
  };
  setError: (error: string) => void;
  onSubmit: (data: { name: string; price: string; desc: string }) => void;
}

const AddNewFoodEditForm: React.FC<AddNewFoodEditFormProps> = ({ mode, initialValues = {}, setError, onSubmit }) => {
  const [name, setName] = useState<string>(initialValues.name || "");
  const [price, setPrice] = useState<string>(initialValues.price || "");
  const [desc, setDesc] = useState<string>(initialValues.desc || "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} placeholder="name" onChange={(e) => setName(e.target.value)} required />
      <input type="text" value={price} placeholder="price" onChange={(e) => setPrice(e.target.value)} required />
      <input type="text" value={desc} placeholder="desc" onChange={(e) => setDesc(e.target.value)} required />
      <button type="submit">{mode === "add" ? "Add New Food" : "Edit Food"}</button>
    </form>
  );
};

export default AddNewFoodEditForm;
