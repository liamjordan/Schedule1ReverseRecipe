import React, { useState } from "react";
import { IngredientRepository } from "../models/IngredientRepository";
import { Ingredient } from "../models/Ingredient";
import { MixStep } from "../models/MixStep";
import "../App.css";

const BaseDrugs: Record<string, string | null> = {
  "OG Kush": "Calming",
  "Sour Diesel": "Refreshing",
  "Green Crack": "Energizing",
  "Granddaddy Purple": "Sedating",
  "Cocaine": null,
  "Meth": null
};

const MixPreviewPage: React.FC = () => {
  const allIngredients = IngredientRepository.getAllIngredients();
  const [baseDrug, setBaseDrug] = useState<string>("OG Kush");
  const [ingredientSteps, setIngredientSteps] = useState<string[]>([""]);
  const [finalEffects, setFinalEffects] = useState<string[]>([]);
  const [steps, setSteps] = useState<MixStep[]>([]);

  const updateIngredientAtStep = (index: number, name: string) => {
    const newSteps = [...ingredientSteps];
    newSteps[index] = name;
    setIngredientSteps(newSteps);

    if (name !== "" && index === ingredientSteps.length - 1) {
      setIngredientSteps([...newSteps, ""]);
    }
  };

  const removeIngredientStep = (index: number) => {
    setIngredientSteps(prev => prev.filter((_, i) => i !== index));
  };

  const previewMix = () => {
    const usedIngredients = ingredientSteps
      .filter(name => name !== "")
      .map(name => allIngredients.find(i => i.name === name))
      .filter((i): i is Ingredient => i !== undefined);

    const currentEffects = new Set<string>();
    const stepList: MixStep[] = [];

    // Add base effect first
    const baseEffect = BaseDrugs[baseDrug];
    if (baseEffect) currentEffects.add(baseEffect);

    for (const ingredient of usedIngredients) {
      const step = new MixStep(ingredient);
      const updatedEffects = new Set(currentEffects);

      // Apply conditional effects first
      for (const cond of ingredient.conditionalEffects) {
        const hasTrigger = currentEffects.has(cond.triggerEffect);
        const secondaryOk = cond.secondaryCondition == null ||
          (cond.secondaryMustExist === true && currentEffects.has(cond.secondaryCondition)) ||
          (cond.secondaryMustExist === false && !currentEffects.has(cond.secondaryCondition));

        if (hasTrigger && secondaryOk) {
          updatedEffects.add(cond.resultingEffect);
          step.contributes.push(cond.resultingEffect);
        }
      }

      // Then add base effects
      for (const base of ingredient.baseEffects) {
        updatedEffects.add(base);
        step.contributes.push(base);
      }

      stepList.push(step);
      currentEffects.clear();
      for (const e of updatedEffects) currentEffects.add(e);
    }

    setFinalEffects([...currentEffects]);
    setSteps(stepList);
  };

  return (
    <div className="App">
      <h1>Drug + Ingredient Mixer</h1>

      <h2>Choose Base Drug</h2>
      <select
        value={baseDrug}
        onChange={(e) => setBaseDrug(e.target.value)}
        style={{ marginBottom: "1rem", padding: "0.5rem" }}
      >
        {Object.keys(BaseDrugs).map((drug) => (
          <option key={drug}>{drug}</option>
        ))}
      </select>

      <h2>Mix Order</h2>
      {ingredientSteps.map((step, idx) => (
        <div key={idx} style={{ marginBottom: "0.5rem", display: "flex", gap: "0.5rem" }}>
          <select
            value={step}
            onChange={(e) => updateIngredientAtStep(idx, e.target.value)}
          >
            <option value="">-- Select Ingredient --</option>
            {allIngredients.map((ingredient) => (
              <option key={ingredient.name} value={ingredient.name}>
                {ingredient.name}
              </option>
            ))}
          </select>
          {step !== "" && <button onClick={() => removeIngredientStep(idx)}>Remove</button>}
        </div>
      ))}

      <button onClick={previewMix}>Preview Mix</button>

      <h2>Final Effects</h2>
      <p>{finalEffects.length > 0 ? finalEffects.join(", ") : "None"}</p>

      <h3>Effect Steps</h3>
      <ol>
        {steps.map((step, idx) => (
          <li key={idx}>
            <strong>{step.ingredient.name}</strong> → {step.contributes.join(", ") || "None"}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default MixPreviewPage;