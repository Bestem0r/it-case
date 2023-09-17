import { Dispatch, useEffect, useState } from "react";
import { Cocktail, Ingredient } from "../constants/types";
import { fetchCocktailsAny } from "@/api/fetchCocktails";
import styles from "./Recipes.module.css";
import { ArrowForward } from "react-ionicons";
import { Dialog } from "@headlessui/react";

interface AddIngredientsProps {
  generateDrinks: boolean;
  setGenerateDrinks: Dispatch<React.SetStateAction<boolean>>;
  ingredientList: Ingredient[] | null;
  drinkList: Cocktail[] | null;
  setDrinkList: Dispatch<React.SetStateAction<Cocktail[] | null>>;
}

type DrinkCardProps = {
  drink: Cocktail;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
  setCurrentDrink: Dispatch<React.SetStateAction<Cocktail | null>>;
};

type DrinkModalProps = {
  drink: Cocktail | null;
  isOpen: boolean;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
};

const DrinkCard = ({ drink, setIsOpen, setCurrentDrink }: DrinkCardProps) => {
  return (
    <div
      className={styles.drinkCard}
      onClick={() => {
        setIsOpen(true);
        setCurrentDrink(drink);
      }}
    >
      <img src={drink.thumbnail} />
      <div className={styles.drinkCardInfo}>
        <p className={styles.drinkCardName}>{drink.name}</p>
        <div className={styles.drinkCardIngredientList}>
          {drink.ingredients.map((ingredient) => (
            <div className={styles.drinkCardRow} key={ingredient.name}>
              <span>
                {!/\d/.test(ingredient.amount) &&
                  ingredient.amount &&
                  ingredient.amount + " "}
                {ingredient.name}
              </span>
              <span>{/\d/.test(ingredient.amount) && ingredient.amount}</span>
            </div>
          ))}
        </div>
        <p className={styles.drinkButton}>
          <span style={{ marginBottom: "6px" }}>Read more</span>
          <ArrowForward height="24px" />
        </p>
      </div>
    </div>
  );
};

const DrinkModal = ({ drink, isOpen, setIsOpen }: DrinkModalProps) => {
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <Dialog.Panel>
        <Dialog.Title>{drink?.name}</Dialog.Title>
        <Dialog.Description>{drink?.instructions}</Dialog.Description>

        <p></p>

        <button onClick={() => setIsOpen(false)}>Deactivate</button>
        <button onClick={() => setIsOpen(false)}>Cancel</button>
      </Dialog.Panel>
    </Dialog>
  );
};

const DrinkList = ({
  generateDrinks,
  ingredientList,
  drinkList,
  setGenerateDrinks,
  setDrinkList,
}: AddIngredientsProps) => {
  const [fetchingDrinks, setFetchingDrinks] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const [currentDrink, setCurrentDrink] = useState<Cocktail | null>(null);

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
      {fetchingDrinks && ""}
      {drinkList && (
        <div className={styles.drinkList}>
          <DrinkModal
            drink={currentDrink}
            setIsOpen={setIsOpen}
            isOpen={isOpen}
          />
          {drinkList.map((drink: Cocktail) => (
            <DrinkCard
              drink={drink}
              key={drink.name}
              setIsOpen={setIsOpen}
              setCurrentDrink={setCurrentDrink}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default DrinkList;
