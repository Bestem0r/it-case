import {Cocktail, CocktailIngredient, Ingredient, RawCocktail, UnpopulatedRawCocktail} from "@/app/constants/types";

const API_KEY = "9973533";
const API_URL = `https://www.thecocktaildb.com/api/json/v2/${API_KEY}/`;

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandomItems<T>(list: T[], n: number): T[] {
  return list.slice(0, n);

  /*const result: T[] = [...list];
  const pickedItems: T[] = [];

  for (let i = result.length - 1; i >= 0 && pickedItems.length < n; i--) {
    const randomIndex = getRandomInt(0, i);
    [result[i], result[randomIndex]] = [result[randomIndex], result[i]];
    pickedItems.push(result[i]);
  }

  return pickedItems;*/
}

export async function fetchCocktailsFromIngredients(ingredients: Ingredient[], alcoholic: boolean) {
  const response = await fetch(`${API_URL}filter.php?i=${ingredients.map(ingredient => ingredient.name).join(',')}`);
  const json = (await response.json())["drinks"];
  if (json === "None Found") return [];
  return json as UnpopulatedRawCocktail[];
}

export async function fetchCocktailFromId(id: string) {
  const response = await fetch(`${API_URL}lookup.php?i=${id}`);
  const json = (await response.json())["drinks"];
  if (json === "None Found") return null;
  return json[0] as RawCocktail;
}

export async function fetchIngredients() {
  const response = await fetch(`${API_URL}list.php?i=list`);
  return await response.json();
}

async function populateCocktail(cocktail: UnpopulatedRawCocktail): Promise<Cocktail | null> {
  const data = await fetchCocktailFromId(cocktail.idDrink);
  if (data == null) return null;

  return {
    name: data.strDrink,
    thumbnail: data.strDrinkThumb,
    instructions: await rewriteWithGpt(data.strInstructions),
    ingredients: ([
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
    ] as CocktailIngredient[]).filter(ingredient => ingredient.name != null)
  };
}

async function populateCocktails(cocktails: UnpopulatedRawCocktail[]) {
  const promises = cocktails.map(cocktail => populateCocktail(cocktail));
  const responses = await Promise.all(promises);
  return responses.filter(response => response != null) as Cocktail[];
}

async function rewriteWithGpt(instructions: string): Promise<string> {

  const apiRequestBody = {
    "model": "gpt-3.5-turbo",
    "messages": [
      {"role": "user", "content": "Make these drink intructions more clear and add steps. Do not add titles and ingredients list. Keep it very short and add a newline character to each step: " + instructions},
    ],
  };

    const API_KEY = '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'
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + API_KEY,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(apiRequestBody),
    });

    const json = await response.json();
    console.log(json);
    return json.choices[0]?.message?.content;
}

export async function fetchCocktailsAll(ingredients: Ingredient[], count: number, alcoholic: boolean = true): Promise<Cocktail[]> {
  const cocktails = await fetchCocktailsFromIngredients(ingredients, alcoholic);
  if (cocktails == null) return [];
  const randomCocktails = pickRandomItems(cocktails, count);
  return populateCocktails(randomCocktails);
}

export async function fetchCocktailsAny(ingredients: Ingredient[], count: number, alcoholic: boolean = true): Promise<Cocktail[]>{
  function getAllSubsets<T>(arr: T[]): T[][] {
    const subsets: T[][] = [[]];

    for (const element of arr) {
      const newSubsets = subsets.map((subset) => [...subset, element]);
      subsets.push(...newSubsets);
    }

    return subsets.sort((a, b) => b.length - a.length);
  }

  const fetchedCocktails = await fetchCocktailsFromIngredients(ingredients, alcoholic);
  const cocktails = pickRandomItems(fetchedCocktails, count);

  if (cocktails.length == count) {
    return populateCocktails(cocktails);
  }

  const ingredientSubsets = getAllSubsets(ingredients).slice(1);
  const drinkSet = new Set();
  cocktails.forEach(cocktail => drinkSet.add(cocktail.idDrink));

  let index = 0;
  while (index < ingredientSubsets.length-1 && cocktails.length < count) {
    const _fetchedCocktails = await fetchCocktailsFromIngredients(ingredientSubsets[index], alcoholic);
    const _cocktails = pickRandomItems(_fetchedCocktails, count - cocktails.length);

    for (let i = 0; i < _cocktails.length && cocktails.length < count; i++) {
      if (drinkSet.has(_cocktails[i].idDrink)) {
        continue;
      }

      drinkSet.add(_cocktails[i].idDrink);
      cocktails.push(_cocktails[i]);
    }
    index += 1;
  }

  return populateCocktails(cocktails);
}
