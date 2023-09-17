"use client";

import { useEffect, useState } from "react";
import { getAllIngredients } from "./api/IngredientController";
import AddIngredients from "./components/AddIngredients";
import IngredientList from "./components/IngredientList";
import { getProductsLike } from "./api/VinmonopoletController";

export default function Home() {
  const [refetch, setRefetch] = useState<boolean>(false);
  useEffect(() => {
    getProductsLike("vodka").then((response) => console.log(response));
  }, []);
  return (
    <main>
      <IngredientList refetch={refetch} setRefetch={setRefetch} />
      <AddIngredients setRefetch={setRefetch} />
    </main>
  );
}
