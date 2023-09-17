export type Ingredient = {
  id: number;
  name: string;
  amount: number;
};

export type CocktailIngredient = {
  name: string;
  amount: string;
}

export type Cocktail = {
  name: string;
  thumbnail: string;
  instructions: string;
  ingredients: CocktailIngredient[];
}
