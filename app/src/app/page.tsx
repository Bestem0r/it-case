"use client";

import { useState } from "react";
import { getAllIngredients } from "./api/IngredientController";
import AddIngredients from "./components/AddIngredients";
import IngredientList from "./components/IngredientList";
import Ingredient from "./constants/types";

export default function Home() {
  const [refetch, setRefetch] = useState<boolean>(false);
  const [ingredientList, setIngredientList] = useState<Ingredient[] | null>(
    null
  );

  return (
    <main>
      <IngredientList
        refetch={refetch}
        setRefetch={setRefetch}
        ingredientList={ingredientList}
        setIngredientList={setIngredientList}
      />
      <AddIngredients setRefetch={setRefetch} />
    </main>
  );
}
