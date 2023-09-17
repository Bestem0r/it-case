import Ingredient from "@/app/constants/types";

const API_KEY = "7d1tR1OEfdlpqqt8lE6cjQ==APKc86iendGIjdmB";
const API_URL = `https://api.api-ninjas.com/v1/cocktail`;

function getCombinations<T>(arr: T[]): T[][] {
  const result: T[][] = [];
  
  function combine(current: T[], start: number) {
    result.push([...current]);

    for (let i = start; i < arr.length; i++) {
      current.push(arr[i]);
      combine(current, i + 1);
      current.pop();
    }
  }
  
  combine([], 0);
  result.shift();
  return result;
}

export async function fetchCocktailsAll(ingredients: Ingredient[]) {
    const response = await fetch(`${API_URL}?ingredients=${ingredients.map(ingredient => ingredient.name).join(',')}`, {
      headers: {
        'X-Api-Key': API_KEY
      }
    });
    return response.json();
}

export async function fetchCocktailsAny(ingredients: Ingredient[]) {
  const combinations = getCombinations(ingredients); 

  const promises = combinations.map((combo) => fetchCocktailsAll(combo));;

  const responses = await Promise.all(promises);

  const uniqueCocktailNames = new Set();
  const filterDuplicateDrinks = (cocktail: any) => {
    if (uniqueCocktailNames.has(cocktail.name)) return false;
    uniqueCocktailNames.add(cocktail.name);
    return true;
  }

  return responses.flat().filter(filterDuplicateDrinks);
}
