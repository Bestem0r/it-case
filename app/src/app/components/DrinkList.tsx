import {Dispatch, useEffect, useState,} from "react";
import {Cocktail, Ingredient} from "../constants/types";
import {fetchCocktailsAny} from "@/api/fetchCocktails";

interface AddIngredientsProps {
  generateDrinks: boolean;
  setGenerateDrinks: Dispatch<React.SetStateAction<boolean>>;
  ingredientList: Ingredient[] | null;
  drinkList: Cocktail[] | null;
  setDrinkList: Dispatch<React.SetStateAction<Cocktail[] | null>>;
}

const DrinkList = ({
  generateDrinks,
  ingredientList,
  drinkList,
  setGenerateDrinks,
  setDrinkList,
}: AddIngredientsProps) => {
  const [fetchingDrinks, setFetchingDrinks] = useState(true);

  useEffect(() => {
    if (generateDrinks && ingredientList) {
      setFetchingDrinks(true);
      fetchCocktailsAny(ingredientList, 10).then((data) => {
        setDrinkList(data);
        setFetchingDrinks(false);
        setGenerateDrinks(false);
      });
    }
  }, [generateDrinks]);

  return (
    <>
      {fetchingDrinks && "Loading"}
      {drinkList && (
        <ul>
          {drinkList.map((drink: Cocktail) => {
            return <li key={drink.name}>{drink.instructions}</li>;
          })}
        </ul>
      )}
    </>
  );
};

export default DrinkList;
