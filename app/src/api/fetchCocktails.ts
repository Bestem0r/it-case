import {Cocktail, CocktailIngredient, Ingredient} from "@/app/constants/types";

const API_KEY = "9973533";
const API_URL = `https://www.thecocktaildb.com/api/json/v2/${API_KEY}/`;

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandomItems<T>(list: T[], n: number): T[] {
  const result: T[] = [...list];
  const pickedItems: T[] = [];

  for (let i = result.length - 1; i >= 0 && pickedItems.length < n; i--) {
    const randomIndex = getRandomInt(0, i);
    [result[i], result[randomIndex]] = [result[randomIndex], result[i]];
    pickedItems.push(result[i]);
  }

  return pickedItems;
}

async function populateCocktail(cocktail: any): Promise<Cocktail> {
  const response = await fetch(`${API_URL}lookup.php?i=${cocktail.idDrink}`);
  const data = (await response.json())["drinks"][0];

  return {
    name: data.strDrink,
    thumbnail: data.strDrinkThumb,
    instructions: data.strInstructions,
    ingredients: [
      { name: data.strIngredient1, amount: data.strMeasure1},
      { name: data.strIngredient2, amount: data.strMeasure2},
      { name: data.strIngredient3, amount: data.strMeasure3},
      { name: data.strIngredient4, amount: data.strMeasure4},
      { name: data.strIngredient5, amount: data.strMeasure5},
      { name: data.strIngredient6, amount: data.strMeasure6},
      { name: data.strIngredient7, amount: data.strMeasure7},
      { name: data.strIngredient8, amount: data.strMeasure8},
      { name: data.strIngredient9, amount: data.strMeasure9},
      { name: data.strIngredient10, amount: data.strMeasure10},
      { name: data.strIngredient11, amount: data.strMeasure11},
      { name: data.strIngredient12, amount: data.strMeasure12},
      { name: data.strIngredient13, amount: data.strMeasure13},
      { name: data.strIngredient14, amount: data.strMeasure14},
      { name: data.strIngredient15, amount: data.strMeasure15}
    ] as CocktailIngredient[]
  };
}

async function populateCocktails(cocktails: any[]) {
  const promises = cocktails.map(cocktail => populateCocktail(cocktail));
  const responses = await Promise.all(promises);
  return responses;
}

async function fetchCocktailsAll(ingredients: Ingredient[]): Promise<Cocktail[]> {
    const response = await fetch(`${API_URL}filter.php?i=${ingredients.map(ingredient => ingredient.name).join(',')}`);
    const cocktails = (await response.json())["drinks"] as any[];
    const randomCocktails = pickRandomItems(cocktails, 10);
    return populateCocktails(randomCocktails);
}

export async function fetchCocktailsAny(ingredients: Ingredient[]): Promise<Cocktail[]>{
  return fetchCocktailsAll(ingredients);
}
