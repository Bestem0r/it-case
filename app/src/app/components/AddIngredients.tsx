import { ChangeEvent, Dispatch, HtmlHTMLAttributes, useState } from "react";
import { handleAddIngredient } from "../api/IngredientController";

import styles from './ingredients.module.css'
import { AddOutline } from "react-ionicons"


interface AddIngredientsProps {
  setRefetch: Dispatch<React.SetStateAction<boolean>>;
}

const AddIngredients = ({ setRefetch }: AddIngredientsProps) => {
  const [amount, setAmount] = useState(0);
  const [name, setName] = useState("");

  function handleAmountChange(event: ChangeEvent<HTMLInputElement>) {
    setAmount(Number(event.target.value));
  }

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    setName(String(event.target.value));
  }

  function addIngredient() {
    handleAddIngredient(name, amount, setRefetch);
  }

  return (
    <>
      <div className={styles.inputContainer}>
        <input style={{marginRight: "4px"}} type="text" placeholder="Name" onChange={handleNameChange}></input>
        <input style={{marginLeft: "4px"}} type="number" step={0.5} onChange={handleAmountChange}></input>
        <button style={{marginLeft: "8px"}} className="buttonIcon" onClick={addIngredient}>
          <AddOutline
              color={'#FFFFFF'}
              title={"Add"}
              height="24px"
              width="24px"/>
        </button>
      </div>
    </>
  );
};

export default AddIngredients;
