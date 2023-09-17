import {
  ChangeEvent,
  Dispatch,
  HtmlHTMLAttributes,
  useEffect,
  useState,
} from "react";
import { getAllIngredients } from "../api/IngredientController";
import Ingredient from "../constants/types";

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
      setLoading(false);
      setIngredientList(response);
      setRefetch(false);
    });
    setLoading(true);
  }, [refetch]);

  return (
    <>
      {loading && "Ingredients are loading"}
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
    </>
  );
};

export default IngredientList;
