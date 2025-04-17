import { Ingredient } from "./Ingredient";

export class MixStep {
  ingredient: Ingredient;
  contributes: string[] = [];

  constructor(ingredient: Ingredient) {
    this.ingredient = ingredient;
  }

  toString(): string {
    const effects = this.contributes.join(", ");
    return `${this.ingredient.name} → ${effects}`;
  }
}