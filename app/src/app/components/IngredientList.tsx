import {Dispatch, useEffect, useState,} from "react";
import {getAllIngredients, handleRemoveIngredient,} from "../../api/IngredientController";
import {Ingredient} from "../constants/types";
import {TrashOutline} from "react-ionicons";
import styles from './Ingredients.module.css'

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
    <div style={{marginTop: '8px'}}>
      <span className={styles.inputDescription}>Your ingredients</span>
      {/* {loading && "Ingredients are loading"} */}
      {ingredientList && (
        <ul className={styles.ul}>
          {ingredientList.map((ingredient: Ingredient) => {
            return (
              <li className={styles.li} key={ingredient.id}>
                {ingredient.name} - {ingredient.amount} L{" "}
                <div style={{marginLeft: "auto", cursor: "pointer"}}>
                  <TrashOutline
                      key={ingredient.id} onClick={() => handleIngredientRemove(ingredient.id)} color={'#e0466f'}/>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default IngredientList;
