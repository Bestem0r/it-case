import { ChangeEvent, HtmlHTMLAttributes, useState } from "react";
import handleAddIngredient from "../api/IngredientController";

const AddIngredients = () => {
  const [amount, setAmount] = useState(0);
  const [name, setName] = useState("");

  function handleAmountChange(event: ChangeEvent<HTMLInputElement>) {
    setAmount(Number(event.target.value));
  }

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    setName(String(event.target.value));
  }

  return (
    <>
      <input type="number" step={0.5} onChange={handleAmountChange}></input>
      <input type="text"></input>
      <button onClick={handleAddIngredient()}>Legg til</button>
    </>
  );
};

export default AddIngredients;
