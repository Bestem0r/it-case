import {Dispatch, Fragment, useEffect, useState} from "react";
import {Cocktail, CocktailIngredient, Ingredient} from "../constants/types";
import {fetchCocktailsAny} from "@/api/fetchCocktails";
import styles from "./Recipes.module.css";
import {ArrowForward, Close} from "react-ionicons";
import {Dialog, Transition} from "@headlessui/react";
import {getProductsLike} from "@/api/VinmonopoletController";
import Typewriter from "typewriter-effect";

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
  setGenerateVPData: Dispatch<React.SetStateAction<boolean>>;
};

type DrinkModalProps = {
  drink: Cocktail | null;
  isOpen: boolean;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
  vpData: any;
};

const DrinkCard = ({
  drink,
  setIsOpen,
  setCurrentDrink,
  setGenerateVPData,
}: DrinkCardProps) => {
  return (
    <div
      className={styles.drinkCard}
      onClick={() => {
        setIsOpen(true);
        setCurrentDrink(drink);
        setGenerateVPData(true);
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
          <span>Read more</span>
          <ArrowForward color={'#e0466f'}  height="24px" />
        </p>
      </div>
    </div>
  );
};

const DrinkModal = ({ drink, isOpen, setIsOpen, vpData }: DrinkModalProps) => {
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
        <button
          style={{ display: "none" }}
          type="button"
          onClick={openModal}
          className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Open dialog
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  style={{ padding: "3em", backgroundColor: "#efe2dc" }}
                  className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-background p-6 text-left align-middle shadow-xl transition-all"
                >
                  <Dialog.Title
                    as="h1"
                    style={{ fontSize: "48px", lineHeight: "2em", borderBottom: "1px solid black" }}
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {drink?.name}
                  </Dialog.Title>

                  <div
                    style={{ display: "grid", gridTemplateColumns: "1fr 1fr", marginTop: "2em" }}
                  >
                    <div className="mt-2" style={{ paddingRight: "2em" }}>
                      <h2
                        style={{
                          marginTop: "1em",
                          marginBottom: "1em",
                          fontSize: "larger",
                          fontWeight: "650",
                        }}
                      >
                        Instructions
                      </h2>
                      <p style={{whiteSpace: "pre-line", wordWrap: "break-word"}}>{drink?.instructions}</p>
                    </div>

                    <div>
                      <h2
                          style={{
                            marginTop: "1.2em",
                            marginBottom: "1em",
                            fontSize: "larger",
                            fontWeight: "650",
                          }}
                      >
                        Ingredients
                      </h2>
                      <div
                          className={styles.drinkCardIngredientList}
                          style={{ height: "100%"}}
                      >
                        {drink?.ingredients.map((ingredient) => (
                            <div
                                className={styles.drinkCardRow}
                                key={ingredient.name}
                            >
                          <span>
                            {!/\d/.test(ingredient.amount) &&
                                ingredient.amount &&
                                ingredient.amount + " "}
                            {ingredient.name}
                          </span>
                              <span>
                            {/\d/.test(ingredient.amount) && ingredient.amount}
                          </span>
                            </div>
                        ))}
                      </div>

                    </div>

                  </div>

                  {vpData && vpData.length > 0 && (
                    <div className={styles.vpDataList}>
                      <h2>From Vinmonopolet</h2>
                      <ul>
                        {vpData
                          .filter((e: any) => e.productId)
                          .map((e: any) => (
                            <li key={e.productId}>
                              <a
                                href={`https://www.vinmonopolet.no/p/${e.productId}`}
                                target="_blank"
                                rel="noopener noreferrer" // It's good practice to add this when using target="_blank"
                              >
                                {e.productShortName}
                              </a>
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}

                  <button
                      style={{ position: "absolute", top: "1em", right: "1em", borderRadius: "50%" }}
                      className="buttonIcon"
                      onClick={closeModal}
                  >
                    <Close
                        color={"#fff"}
                        title={"Close"}
                        height="24px"
                        width="24px"/>
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
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
  const [isOpen, setIsOpen] = useState(false);
  const [currentDrink, setCurrentDrink] = useState<Cocktail | null>(null);
  const [fetchingVP, setFetchingVP] = useState(false);
  const [generateVPData, setGenerateVPData] = useState(false);
  const [vpData, setVPData] = useState<any>(null);

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

  useEffect(() => {
    if (generateVPData && currentDrink) {
      setFetchingVP(true);
      const promises = currentDrink.ingredients
        // .filter(
        //   (ingredient: CocktailIngredient) =>
        //     ingredientList?.map((e) => e.name)?.includes(ingredient?.name) ===
        //     false
        // )
        .map((drink: CocktailIngredient) => getProductsLike(drink.name));
      Promise.all(promises)
        .then((results) => {
          const VPData = results
            .filter((result) => result.length > 0)
            .map((result) => ({
              productId: result[0].basic.productId ?? null,
              productShortName: result[0].basic.productShortName ?? null,
            }));
          console.log(VPData);
          setVPData(VPData);
        })
        .catch((error) => {
          console.error("There was an error fetching data", error);
        })
        .finally(() => {
          setFetchingVP(false);
          setGenerateVPData(false);
        });
    }
  }, [generateVPData, currentDrink]);

  return (
    <>
      {fetchingDrinks && generateDrinks && (
          <Typewriter
              options={{
                strings: [
                  "Rounding up refreshments...",
                ],
                autoStart: true,
                loop: true,
                wrapperClassName: styles.typewriter,
                cursorClassName: styles.typewriter,
              }}
          />

      )}
      {drinkList && (
        <div className={styles.drinkList}>
          <DrinkModal
            drink={currentDrink}
            setIsOpen={setIsOpen}
            isOpen={isOpen}
            vpData={vpData}
          />
          {drinkList.map((drink: Cocktail) => (
            <DrinkCard
              drink={drink}
              key={drink.name}
              setIsOpen={setIsOpen}
              setCurrentDrink={setCurrentDrink}
              setGenerateVPData={setGenerateVPData}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default DrinkList;
