import {
  ChangeEvent,
  Dispatch,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { handleAddIngredient } from "../../api/IngredientController";

import styles from "./Ingredients.module.css";
import { AddOutline } from "react-ionicons";
import IngredientInput from "./IngredientInput";

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

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      addIngredient();
    }
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
        <div className={styles.inputWrapper} style={{ flexGrow: 1 }}>
          <span className={styles.inputDescription}>Ingredient</span>
          <IngredientInput setName={setName} name={name} />
        </div>

        <div className={styles.inputWrapper} style={{ width: "105px" }}>
          <span className={styles.inputDescription}>Amount (liters)</span>
          <input
            type="number"
            min={0}
            step={0.5}
            placeholder="0.5"
            onChange={handleAmountChange}
            ref={amountInput}
          ></input>
        </div>
        <div>
          <div
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
          </div>
        </div>
      </div>
    </>
  );
};

export default AddIngredients;
