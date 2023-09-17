import {
  ChangeEvent,
  Dispatch,
  HtmlHTMLAttributes,
  useEffect,
  useState,
} from "react";
import { getAllIngredients } from "../api/IngredientController";
import Ingredient from "../constants/types";

import styles from './ingredients.module.css'

interface AddIngredientsProps {
  refetch: boolean;
  setRefetch: Dispatch<React.SetStateAction<boolean>>;
}

const IngredientList = ({ refetch, setRefetch }: AddIngredientsProps) => {
  const [loading, setLoading] = useState(true);
  const [ingredientList, setIngredientList] = useState<Ingredient[] | null>(
    null
  );

  useEffect(() => {
    getAllIngredients().then((response) => {
      setLoading(false);
      setIngredientList(response);
      setRefetch(false);
    });
    setLoading(true);
  }, [refetch]);

  return (
    <>
      <div style={{marginTop: "1em"}}>
        {loading && "Ingredients are loading..."}
        {ingredientList && (
            <ul>
              {ingredientList.map((ingredient: Ingredient) => {
                return (
                    <li key={ingredient.id}>
                      {ingredient.name} - {ingredient.amount} L
                    </li>
                );
              })}
            </ul>
        )}
      </div>
    </>
  );
};

export default IngredientList;
