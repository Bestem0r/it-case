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
import { Cocktail, Ingredient } from "../constants/types";
import { fetchCocktailsAny } from "@/api/fetchCocktails";
import styles from "./Recipes.module.css";
import { ArrowForward } from "react-ionicons";

interface AddIngredientsProps {
  generateDrinks: boolean;
  setGenerateDrinks: Dispatch<React.SetStateAction<boolean>>;
  ingredientList: Ingredient[] | null;
  drinkList: Cocktail[] | null;
  setDrinkList: Dispatch<React.SetStateAction<Cocktail[] | null>>;
}

type DrinkCardProps = {
  drink: Cocktail;
}

const DrinkCard = ({drink}: DrinkCardProps) => {
  return (
    <div className={styles.drinkCard}>
      <img src={drink.thumbnail}/>
      <div className={styles.drinkCardInfo}>
        <p className={styles.drinkCardName}>{drink.name}</p>
        <div className={styles.drinkCardIngredientList}>
          {drink.ingredients.map((ingredient) =>
            <div className={styles.drinkCardRow}>
              <span>{(!(/\d/.test(ingredient.amount)) && ingredient.amount) && (ingredient.amount + " ")}{ingredient.name}</span>
              <span>{/\d/.test(ingredient.amount) && ingredient.amount}</span>
            </div>
          )}
        </div>
        <p className={styles.drinkButton}><span>Read more</span><ArrowForward height="24px"/></p>
      </div>
    </div>
  )
};

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
        <div className={styles.drinkList}>
          {drinkList.map((drink: Cocktail) => <DrinkCard drink={drink}/>)}
        </div>
      )}
    </>
  );
};

export default DrinkList;
