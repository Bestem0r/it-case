import {Dispatch, useEffect, useState} from "react";
import {getAllIngredients, handleRemoveIngredient,} from "../../api/IngredientController";
import {Ingredient} from "../constants/types";
import {TrashOutline} from "react-ionicons";
import styles from "./Ingredients.module.css";

interface AddIngredientsProps {
  refetch: boolean;
  setRefetch: Dispatch<React.SetStateAction<boolean>>;
  ingredientList: Ingredient[] | null;
  setIngredientList: Dispatch<React.SetStateAction<Ingredient[] | null>>;
}

const IngredientList = ({
  refetch,
  setRefetch,
  ingredientList,
  setIngredientList,
}: AddIngredientsProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllIngredients().then((response) => {
      setIngredientList(response);
      setLoading(false);
      setRefetch(false);
    });
    setLoading(true);
  }, [refetch]);

  function handleIngredientRemove(id: number) {
    handleRemoveIngredient(id, setRefetch).then((response) => {
      setRefetch(true);
    });
  }

  return (
    <div style={{ marginTop: "1.5rem" }}>
      {/* {loading && "Ingredients are loading"} */}
      {ingredientList && (
        <>
          {
            ingredientList.length > 0 &&
              <span className={styles.inputDescription}>Your ingredients</span>
          }

          <ul className={styles.ul}>
            {ingredientList.map((ingredient: Ingredient) => {
              return (
                <li className={styles.li} key={ingredient.id}>
                  {ingredient.name}{" "}
                  {ingredient.amount > 0 && " - " + ingredient.amount + " L"}{" "}
                  <div
                    style={{
                      marginLeft: "auto",
                      cursor: "pointer",
                    }}
                  >
                    <TrashOutline
                      key={ingredient.id}
                      onClick={() => handleIngredientRemove(ingredient.id)}
                      color={"#e0466f"}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default IngredientList;
