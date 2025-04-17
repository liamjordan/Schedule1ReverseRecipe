import { Ingredient } from "./Ingredient";
import { MixStep } from "./MixStep";

export class MixResult {
  finalEffects: string[] = [];
  ingredientsUsed: Ingredient[] = [];
  steps: MixStep[] = [];

  toString(): string {
    return `Ingredients Used: ${this.ingredientsUsed.map(i => i.name).join(", ")}\n` +
           `Final Effects: ${this.finalEffects.join(", ")}`;
  }
}