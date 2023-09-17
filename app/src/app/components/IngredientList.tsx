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
} from "../api/IngredientController";
import { Ingredient } from "../constants/types";
import { fetchCocktailsAny } from "@/api/fetchCocktails";

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
      setIngredientList(response);
      setLoading(false);
      setRefetch(false);
    });
    setLoading(true);

    if (ingredientList)
      fetchCocktailsAny(ingredientList, 10).then((response) =>
        console.log(response)
      );
  }, [refetch]);

  function handleIngredientRemove(id: number) {
    handleRemoveIngredient(id, setRefetch).then((response) => {
      setRefetch(true);
    });
  }

  return (
    <>
      {/* {loading && "Ingredients are loading"} */}
      {loading && (
        <ul>
          <li>Vodka - 1 L Delete</li>
          <li>Smirnoff - 2 L Delete</li>
        </ul>
      )}
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
