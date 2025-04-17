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

    let currentEffects: Set<string> = new Set();
    const stepList: MixStep[] = [];

    // Add base effect first
    const baseEffect = BaseDrugs[baseDrug];
    if (baseEffect) currentEffects.add(baseEffect);

    for (const ingredient of usedIngredients) {
      const step = new MixStep(ingredient);
      const updatedEffects = new Set<string>();
      const changed = new Set<string>();

      // Apply conditional replacements first
      for (const effect of currentEffects) {
        let replaced = false;
        for (const cond of ingredient.conditionalEffects) {
          const hasTrigger = cond.triggerEffect === effect;
          const secondaryOk = cond.secondaryCondition == null ||
            (cond.secondaryMustExist === true && currentEffects.has(cond.secondaryCondition)) ||
            (cond.secondaryMustExist === false && !currentEffects.has(cond.secondaryCondition));

          if (hasTrigger && secondaryOk) {
            updatedEffects.add(cond.resultingEffect);
            step.contributes.push(cond.resultingEffect);
            changed.add(effect);
            replaced = true;
            break;
          }
        }
        if (!replaced) {
          updatedEffects.add(effect);
        }
      }

      // Add base effects
      for (const base of ingredient.baseEffects) {
        updatedEffects.add(base);
        step.contributes.push(base);
      }

      currentEffects = updatedEffects;
      stepList.push(step);
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
        style={{ marginBottom: "1rem", padding: "0.5rem", width: "100%" }}
      >
        {Object.keys(BaseDrugs).map((drug) => (
          <option key={drug}>{drug}</option>
        ))}
      </select>

      <h2>Mix Order</h2>
      {ingredientSteps.map((step, idx) => (
        <div key={idx} style={{ marginBottom: "0.75rem", display: "flex", gap: "0.5rem" }}>
          <select
            value={step}
            onChange={(e) => updateIngredientAtStep(idx, e.target.value)}
            style={{ flex: 1, padding: "0.5rem" }}
          >
            <option value="">-- Select Ingredient --</option>
            {allIngredients.map((ingredient) => (
              <option key={ingredient.name} value={ingredient.name}>
                {ingredient.name}
              </option>
            ))}
          </select>
          {step !== "" && (
            <button onClick={() => removeIngredientStep(idx)} style={{ padding: "0.5rem" }}>Remove</button>
          )}
        </div>
      ))}

      <button onClick={previewMix} style={{ marginTop: "1rem" }}>Preview Mix</button>

      <h2 style={{ marginTop: "2rem" }}>Final Effects</h2>
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