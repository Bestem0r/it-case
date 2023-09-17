import { ChangeEvent, Dispatch, useRef, useState } from "react";
import { handleAddIngredient } from "../../api/IngredientController";

import styles from "./Ingredients.module.css";
import { AddOutline } from "react-ionicons";

interface AddIngredientsProps {
  setRefetch: Dispatch<React.SetStateAction<boolean>>;
}

const AddIngredients = ({ setRefetch }: AddIngredientsProps) => {
  const [amount, setAmount] = useState(0);
  const [name, setName] = useState("");
  const amountInput = useRef<HTMLInputElement | null>(null);
  const nameInput = useRef<HTMLInputElement | null>(null);

  function handleAmountChange(event: ChangeEvent<HTMLInputElement>) {
    setAmount(Number(event.target.value));
  }

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    setName(String(event.target.value));
  }

  function addIngredient() {
    handleAddIngredient(name, amount, setRefetch);
    setRefetch(true);
    if (amountInput.current) amountInput.current.value = "";
    if (nameInput.current) nameInput.current.value = "";
  }

  return (
    <>
      <div className={styles.inputContainer}>
        <div className={styles.inputWrapper} style={{ width: "100%" }}>
          <span className={styles.inputDescription}>Ingredient</span>
          <input
            style={{ marginRight: "4px" }}
            type="text"
            placeholder="Name"
            onChange={handleNameChange}
            ref={nameInput}
          ></input>
        </div>

        <div className={styles.inputWrapper}>
          <span className={styles.inputDescription}>Amount (Litre)</span>
          <input
            style={{ marginLeft: "4px", width: "72px" }}
            type="number"
            placeholder="Amount"
            step={0.5}
            onChange={handleAmountChange}
            ref={amountInput}
          ></input>
        </div>
        <div style={{ width: "48px" }}>
          <button
            style={{ marginLeft: "8px" }}
            className="buttonIcon"
            onClick={addIngredient}
          >
            {" "}
            <AddOutline
              color={"#FFFFFF"}
              title={"Add"}
              height="24px"
              width="24px"
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default AddIngredients;
