import { ConditionalEffect } from "./ConditionalEffect";

export class Ingredient {
  name: string;
  baseEffects: string[] = [];
  conditionalEffects: ConditionalEffect[] = [];

  constructor(name: string) {
    this.name = name;
  }

  addBaseEffect(effect: string): void {
    this.baseEffects.push(effect);
  }

  addConditionalEffect(
    trigger: string,
    result: string,
    secondary?: string,
    mustExist?: boolean
  ): void {
    this.conditionalEffects.push(
      new ConditionalEffect(trigger, result, secondary, mustExist)
    );
  }

  toString(): string {
    return this.name;
  }
}