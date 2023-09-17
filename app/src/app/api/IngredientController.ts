import { localIngredientEndpoint } from "../constants/constants";

function handleAddIngredient(name: string, amount: number) {
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

export default handleAddIngredient;
