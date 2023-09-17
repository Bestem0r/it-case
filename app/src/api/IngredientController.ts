import {Dispatch} from "react";
import {localIngredientEndpoint} from "../app/constants/constants";

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

function handleRemoveIngredient(
  id: number,
  setRefetch: Dispatch<React.SetStateAction<boolean>>
) {
  const remove = fetch(`${localIngredientEndpoint}${id}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      setRefetch(true);
      if (!response.ok) {
      }
      return response;
    })
    .then((data) => {
      setRefetch(true);
      return data;
    })
    .catch((error) => {
      console.error(
        "There was a problem with the fetch operation:",
        error.message
      );
    });

  return remove;
}

async function getAllIngredients() {
  const ingredients = fetch(localIngredientEndpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
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

export { handleAddIngredient, getAllIngredients, handleRemoveIngredient };
