"use client";

import { getAllIngredients } from "./api/IngredientController";
import AddIngredients from "./components/AddIngredients";
import IngredientList from "./components/IngredientList";

export default function Home() {
  return (
    <main>
      <IngredientList />
      <AddIngredients />
    </main>
  );
}
