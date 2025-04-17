import { Ingredient } from "../models/Ingredient";
import { MixStep } from "../models/MixStep";
import { MixResult } from "../models/MixResult";
import { IngredientRepository } from "../models/IngredientRepository";

// State of a node in BFS
interface State {
  effects: string[];
  used: Ingredient[];
  steps: MixStep[];
}

const BaseDrugs: Record<string, string | null> = {
  "OG Kush": "Calming",
  "Sour Diesel": "Refreshing",
  "Green Crack": "Energizing",
  "Granddaddy Purple": "Sedating",
  "Cocaine": null,
  "Meth": null
};

export class MixingService {
  private allIngredients: Ingredient[] = [];
  private maxDepth: number;

  constructor(maxDepth: number = 6) {
    this.allIngredients = IngredientRepository.getAllIngredients();
    this.maxDepth = Math.min(maxDepth, 10); // Cap depth at 10
  }

  solveUsingBFS(targetEffects: string[], baseDrug?: string): MixResult {
    const baseEffect = baseDrug && BaseDrugs[baseDrug] ? [BaseDrugs[baseDrug]!] : [];

    const queue: State[] = [
      {
        effects: baseEffect,
        used: [],
        steps: []
      }
    ];

    const visited = new Set<string>();

    while (queue.length > 0) {
      const current = queue.shift()!;

      const key = [...current.effects].sort().join(",") + "|" + current.used.map(i => i.name).join(",");
      if (visited.has(key)) continue;
      visited.add(key);

      // Success case
      if (targetEffects.every(e => current.effects.includes(e))) {
        const result = new MixResult();
        result.finalEffects = current.effects;
        result.ingredientsUsed = current.used;
        result.steps = current.steps;
        return result;
      }

      // Enforce depth limit
      if (current.used.length >= this.maxDepth) continue;

      for (const ingredient of this.allIngredients) {
        // Allow using the same ingredient multiple times

        const prevEffects = [...current.effects];
        const step = new MixStep(ingredient);
        const newEffectsSet = new Set<string>();
        const changedEffects = new Set<string>();

        // Step 1: Add all conditional replacements
        for (const effect of prevEffects) {
          let changed = false;

          for (const cond of ingredient.conditionalEffects) {
            const secondaryOk = cond.secondaryCondition == null ||
              (cond.secondaryMustExist === true && prevEffects.includes(cond.secondaryCondition)) ||
              (cond.secondaryMustExist === false && !prevEffects.includes(cond.secondaryCondition));

            if (cond.triggerEffect === effect && secondaryOk) {
              newEffectsSet.add(cond.resultingEffect);
              step.contributes.push(cond.resultingEffect);
              changedEffects.add(effect);
              changed = true;
              break; // Only one replacement per effect
            }
          }

          if (!changed) {
            newEffectsSet.add(effect);
          }
        }

        // Step 2: Add base effects only if limit not exceeded
        if (newEffectsSet.size < 8) {
          for (const base of ingredient.baseEffects) {
            if (newEffectsSet.size < 8) {
              newEffectsSet.add(base);
              step.contributes.push(base);
            }
          }
        }

        queue.push({
          effects: [...newEffectsSet],
          used: [...current.used, ingredient],
          steps: [...current.steps, step]
        });
      }
    }

    // If no valid mix was found, return a result with an error message
    const result = new MixResult();
    result.finalEffects = ["Impossible recipe"];
    result.ingredientsUsed = [];
    result.steps = [];
    return result;
  }
}
