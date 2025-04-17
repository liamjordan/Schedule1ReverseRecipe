import React, { useEffect, useState } from "react";
import "./App.css";
import { IngredientRepository } from "./models/IngredientRepository";
import { MixingService } from "./services/MixingService";
import { MixStep } from "./models/MixStep";

function App() {
  const [allEffects, setAllEffects] = useState<string[]>([]);
  const [selectedEffects, setSelectedEffects] = useState<string[]>([]);
  const [steps, setSteps] = useState<MixStep[]>([]);
  const [finalEffects, setFinalEffects] = useState<string[]>([]);
  const [maxDepth, setMaxDepth] = useState<number>(6);
  const [baseDrug, setBaseDrug] = useState<string>("OG Kush");

  useEffect(() => {
    const ingredients = IngredientRepository.getAllIngredients();
    const effects = [
      ...new Set(
        ingredients.flatMap((i) =>
          i.baseEffects.concat(i.conditionalEffects.map((c) => c.resultingEffect))
        )
      ),
    ].sort();
    setAllEffects(effects);
  }, []);

  const toggleEffect = (effect: string) => {
    setSelectedEffects((prev) =>
      prev.includes(effect)
        ? prev.filter((e) => e !== effect)
        : [...prev, effect]
    );
  };

  const runSolver = () => {
    const service = new MixingService(maxDepth);
    const result = service.solveUsingBFS(selectedEffects, baseDrug);
    setSteps(result.steps);
    setFinalEffects(result.finalEffects);
  };

  return (
    <div className="App">
      <h1>Schedule 1 Reverse Recipe Tool</h1>

      <h2>Select Desired Effects</h2>
      <div className="effect-list">
        {allEffects.map((effect) => (
          <label key={effect}>
            <input
              type="checkbox"
              checked={selectedEffects.includes(effect)}
              onChange={() => toggleEffect(effect)}
            />
            {effect}
          </label>
        ))}
      </div>

      <h2 title="Higher depth explores more combinations, but takes more time (max 10)">
        Max Mix Depth: {maxDepth}
      </h2>
      <input
        type="range"
        min={1}
        max={10}
        value={maxDepth}
        onChange={(e) => setMaxDepth(parseInt(e.target.value))}
        style={{ width: "100%" }}
      />

      <h2>Choose Base Drug</h2>
      <select
        value={baseDrug}
        onChange={(e) => setBaseDrug(e.target.value)}
        style={{ marginBottom: "1rem", padding: "0.5rem" }}
      >
        <option>OG Kush</option>
        <option>Sour Diesel</option>
        <option>Green Crack</option>
        <option>Granddaddy Purple</option>
        <option>Cocaine</option>
        <option>Meth</option>
      </select>

      <button onClick={runSolver}>Mix It!</button>

      <h2>Result</h2>
      {steps.length > 0 && finalEffects[0] !== "Impossible recipe" ? (
        <>
          <h3>Mixing Steps</h3>
          <ol>
            {steps.map((step, idx) => (
              <li key={idx}>
                <strong>{step.ingredient.name}</strong> →{" "}
                {step.contributes.join(", ")}
              </li>
            ))}
          </ol>
          <h3>Final Effects</h3>
          <p>{finalEffects.join(", ")}</p>
        </>
      ) : (
        <p><strong>{finalEffects[0]}</strong></p>
      )}
    </div>
  );
}

export default App;
