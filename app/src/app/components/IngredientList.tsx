import {
  ChangeEvent,
  Dispatch,
  HtmlHTMLAttributes,
  useEffect,
  useState,
} from "react";
import {
  getAllIngredients,
  handleRemoveIngredient,
} from "../../api/IngredientController";
import { Ingredient } from "../constants/types";
import { fetchCocktailsAny } from "@/api/fetchCocktails";

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
    <>
      {loading && "Loading"}
      {/* {loading && (
        <ul>
          <li>Vodka - 1 L Delete</li>
          <li>Smirnoff - 2 L Delete</li>
        </ul>
      )} */}
      {ingredientList && (
        <ul>
          {ingredientList.map((ingredient: Ingredient) => {
            return (
              <li key={ingredient.id}>
                {ingredient.name} - {ingredient.amount} L{" "}
                <span
                  key={ingredient.id}
                  onClick={() => handleIngredientRemove(ingredient.id)}
                >
                  Delete
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default IngredientList;
