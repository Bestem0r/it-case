import { Dispatch } from "react";
import { localIngredientEndpoint } from "../constants/constants";

async function handleAddIngredient(
  name: string,
  amount: number,
  setRefetch: Dispatch<React.SetStateAction<boolean>>
) {
  const body = {
    name: name,
    amount: amount,
  };

  fetch(localIngredientEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      setRefetch(true);
    })
    .catch((error) => {
      console.error(
        "There was a problem with the fetch operation:",
        error.message
      );
    });
}

function handleUpdateIngredient() {}

function handleRemoveIngredient() {}

async function getAllIngredients() {
  const ingredients = fetch(localIngredientEndpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(
        "There was a problem with the fetch operation:",
        error.message
      );
    });

  return ingredients;
}

export { handleAddIngredient, getAllIngredients };
