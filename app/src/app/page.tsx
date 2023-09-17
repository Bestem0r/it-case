"use client";

import { useState } from "react";
import { getAllIngredients } from "./api/IngredientController";
import AddIngredients from "./components/AddIngredients";
import IngredientList from "./components/IngredientList";

export default function Home() {
  const [refetch, setRefetch] = useState<boolean>(false);
  return (
    <main>
      <IngredientList refetch={refetch} setRefetch={setRefetch} />
      <AddIngredients setRefetch={setRefetch} />
    </main>
  );
}
