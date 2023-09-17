"use client";

import {useRef, useState} from "react";
import AddIngredients from "./components/AddIngredients";
import IngredientList from "./components/IngredientList";

import Typewriter from 'typewriter-effect';

import styles from "./page.module.css";
import Image from "next/image";

import downArrow from "../../public/down-arrow-svgrepo-com.svg";
import {Cocktail, Ingredient} from "./constants/types";
import DrinkList from "./components/DrinkList";

export default function Home() {
  const [refetch, setRefetch] = useState<boolean>(false);
  const [ingredientList, setIngredientList] = useState<Ingredient[] | null>(
    null
  );
  const [drinkList, setDrinkList] = useState<Cocktail[] | null>(null);

  const [generateDrinks, setGenerateDrinks] = useState(false);
  const ref = useRef<HTMLHeadingElement | null>(null);

    function scrollToIngredients() {
        if (ref.current) {
            ref.current?.scrollIntoView({behavior: "smooth"});
        }
    }

  return (
    <main className={styles.main}>
      <div>

        <div className={styles.welcomeContainer}>
          <div className={styles.ideasContainer}>
            <Typewriter
                            options={{
                                strings: ['Margarita', 'Moscow Mule', 'Mojito', 'Spritz', 'Mimosa', 'Bloody Mary'],
                                autoStart: true,
                                loop: true,
                                wrapperClassName: styles.typewriter,
                                cursorClassName: styles.typewriter
                            }}
                        />
            <h3 style={{marginTop: "1em"}}>Find recipes for your favourite drinks 🍸</h3>
            <button
              onClick={scrollToIngredients}
              style={{ marginTop: "3em" }}
              className="buttonRounded"
            >
              CHECK IT OUT{" "}
            </button>
          </div>

          <div
            onClick={scrollToIngredients}
            className={styles.downButton}
          >
            <h3>TRY NOW</h3>
            <Image src={downArrow} alt="Down" height={32} width={32} />
          </div>
        </div>

        <div ref={ref} className={styles.ingredientsContainer}>
          <h1>Add your ingredients 🍇</h1>
          <div style={{ marginTop: "2em", width: "40%" }}>
            <div className={styles.ingredientsInnerContainer}>
              <AddIngredients setRefetch={setRefetch} />
              <IngredientList
                refetch={refetch}
                setRefetch={setRefetch}
                ingredientList={ingredientList}
                setIngredientList={setIngredientList}
              />
            </div>
            <button
              style={{ width: "100%", marginTop: "1em" }}
              className="buttonRounded"
              onClick={() => {
                setGenerateDrinks(true);
              }}
            >
              FIND DRINKS
            </button>
          </div>
        </div>

        <div className={styles.recipesContainer}>
          <h1>Here&apos;s some drinks you can make 🧑‍🍳</h1>
          <DrinkList
            generateDrinks={generateDrinks}
            setGenerateDrinks={setGenerateDrinks}
            ingredientList={ingredientList}
            drinkList={drinkList}
            setDrinkList={setDrinkList}
          />
        </div>
      </div>
    </main>
  );
}
