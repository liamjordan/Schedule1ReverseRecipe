import { Ingredient } from "./Ingredient";

export class IngredientRepository {
  static getAllIngredients(): Ingredient[] {
    const ingredients: Ingredient[] = [];

    const banana = new Ingredient("Banana");
    banana.addBaseEffect("Gingeritis");
    banana.addConditionalEffect("Smelly", "Anti-Gravity");
    banana.addConditionalEffect("Disorienting", "Focused");
    banana.addConditionalEffect("Paranoia", "Jennerising");
    banana.addConditionalEffect("Long Faced", "Refreshing");
    banana.addConditionalEffect("Focused", "Seizure-Inducing");
    banana.addConditionalEffect("Toxic", "Smelly");
    banana.addConditionalEffect("Calming", "Sneaky");
    banana.addConditionalEffect("Cyclopean", "Thought-Provoking");
    banana.addConditionalEffect("Energizing", "Thought-Provoking");
    ingredients.push(banana);

    const paracetamol = new Ingredient("Paracetamol");
    paracetamol.addBaseEffect("Sneaky");
    paracetamol.addConditionalEffect("Munchies", "Anti-Gravity");
    paracetamol.addConditionalEffect("Electrifying", "Athletic");
    paracetamol.addConditionalEffect("Paranoia", "Balding");
    paracetamol.addConditionalEffect("Energizing", "Balding", "Paranoia", false);
    paracetamol.addConditionalEffect("Spicy", "Bright-Eyed");
    paracetamol.addConditionalEffect("Foggy", "Calming");
    paracetamol.addConditionalEffect("Focused", "Gingeritis");
    paracetamol.addConditionalEffect("Energizing", "Paranoia", "Munchies", false);
    paracetamol.addConditionalEffect("Calming", "Slippery");
    paracetamol.addConditionalEffect("Glowing", "Toxic");
    paracetamol.addConditionalEffect("Toxic", "Tropic Thunder");
    ingredients.push(paracetamol);

    const mouthwash = new Ingredient("Mouth Wash");
    mouthwash.addBaseEffect("Balding");
    mouthwash.addConditionalEffect("Calming", "Anti-Gravity");
    mouthwash.addConditionalEffect("Focused", "Jennerising");
    mouthwash.addConditionalEffect("Explosive", "Sedating");
    mouthwash.addConditionalEffect("Calorie-Dense", "Sneaky");
    ingredients.push(mouthwash);

    const motoroil = new Ingredient("Motor Oil");
    motoroil.addBaseEffect("Slippery");
    motoroil.addConditionalEffect("Paranoia", "Anti-Gravity");
    motoroil.addConditionalEffect("Energizing", "Munchies");
    motoroil.addConditionalEffect("Energizing", "Schizophrenic");
    motoroil.addConditionalEffect("Munchies", "Schizophrenic", "Energizing", false);
    motoroil.addConditionalEffect("Euphoric", "Sedating");
    motoroil.addConditionalEffect("Foggy", "Toxic");
    ingredients.push(motoroil);

    const energydrink = new Ingredient("Energy Drink");
    energydrink.addBaseEffect("Athletic");
    energydrink.addConditionalEffect("Schizophrenic", "Balding");
    energydrink.addConditionalEffect("Glowing", "Disorienting");
    energydrink.addConditionalEffect("Disorienting", "Electrifying");
    energydrink.addConditionalEffect("Euphoric", "Energizing");
    energydrink.addConditionalEffect("Spicy", "Euphoric");
    energydrink.addConditionalEffect("Foggy", "Laxative");
    energydrink.addConditionalEffect("Sedating", "Munchies");
    energydrink.addConditionalEffect("Focused", "Shrinking");
    energydrink.addConditionalEffect("Tropic Thunder", "Sneaky");
    ingredients.push(energydrink);

    const cuke = new Ingredient("Cuke");
    cuke.addBaseEffect("Energizing");
    cuke.addConditionalEffect("Munchies", "Athletic");
    cuke.addConditionalEffect("Slippery", "Athletic", "Munchies", true);
    cuke.addConditionalEffect("Foggy", "Cyclopean");
    cuke.addConditionalEffect("Toxic", "Euphoric");
    cuke.addConditionalEffect("Euphoric", "Laxative");
    cuke.addConditionalEffect("Slippery", "Munchies");
    cuke.addConditionalEffect("Sneaky", "Paranoia");
    cuke.addConditionalEffect("Gingeritis", "Thought-Provoking");
    ingredients.push(cuke);

    const battery = new Ingredient("Battery");
    battery.addBaseEffect("Bright-Eyed");
    battery.addConditionalEffect("Laxative", "Calorie-Dense");
    battery.addConditionalEffect("Electrifying", "Euphoric");
    battery.addConditionalEffect("Cyclopean", "Glowing");
    battery.addConditionalEffect("Shrinking", "Munchies");
    battery.addConditionalEffect("Anti-Gravity", "Tropic Thunder");
    battery.addConditionalEffect("Euphoric", "Zombifying");
    ingredients.push(battery);

    const viagra = new Ingredient("Viagra");
    viagra.addBaseEffect("Tropic Thunder");
    viagra.addConditionalEffect("Euphoric", "Bright-Eyed");
    viagra.addConditionalEffect("Laxative", "Calming");
    viagra.addConditionalEffect("Shrinking", "Gingeritis");
    viagra.addConditionalEffect("Athletic", "Sneaky");
    viagra.addConditionalEffect("Disorienting", "Toxic");
    ingredients.push(viagra);

    const flumedicine = new Ingredient("Flu Medicine");
    flumedicine.addBaseEffect("Sedating");
    flumedicine.addConditionalEffect("Calming", "Bright-Eyed");
    flumedicine.addConditionalEffect("Focused", "Calming");
    flumedicine.addConditionalEffect("Laxative", "Euphoric");
    flumedicine.addConditionalEffect("Cyclopean", "Foggy");
    flumedicine.addConditionalEffect("Thought-Provoking", "Gingeritis");
    flumedicine.addConditionalEffect("Athletic", "Munchies");
    flumedicine.addConditionalEffect("Shrinking", "Paranoia");
    flumedicine.addConditionalEffect("Long Faced", "Refreshing");
    flumedicine.addConditionalEffect("Munchies", "Slippery");
    flumedicine.addConditionalEffect("Euphoric", "Toxic");
    ingredients.push(flumedicine);

    const chili = new Ingredient("Chili");
    chili.addBaseEffect("Spicy");
    chili.addConditionalEffect("Sneaky", "Bright-Eyed");
    chili.addConditionalEffect("Athletic", "Euphoric");
    chili.addConditionalEffect("Laxative", "Long Faced");
    chili.addConditionalEffect("Shrinking", "Refreshing");
    chili.addConditionalEffect("Munchies", "Toxic");
    chili.addConditionalEffect("Anti-Gravity", "Tropic Thunder");
    ingredients.push(chili);

    const gasoline = new Ingredient("Gasoline");
    gasoline.addBaseEffect("Toxic");
    gasoline.addConditionalEffect("Paranoia", "Calming");
    gasoline.addConditionalEffect("Electrifying", "Disorienting");
    gasoline.addConditionalEffect("Energizing", "Euphoric");
    gasoline.addConditionalEffect("Shrinking", "Focused");
    gasoline.addConditionalEffect("Laxative", "Foggy");
    gasoline.addConditionalEffect("Disorienting", "Glowing");
    gasoline.addConditionalEffect("Munchies", "Sedating");
    gasoline.addConditionalEffect("Gingeritis", "Smelly");
    gasoline.addConditionalEffect("Jennerising", "Sneaky");
    gasoline.addConditionalEffect("Energizing", "Spicy");
    gasoline.addConditionalEffect("Euphoric", "Spicy", "Energizing", false);
    gasoline.addConditionalEffect("Sneaky", "Tropic Thunder");
    ingredients.push(gasoline);

    const megabean = new Ingredient("Mega Bean");
    megabean.addBaseEffect("Foggy");
    megabean.addConditionalEffect("Sneaky", "Calming");
    megabean.addConditionalEffect("Thought-Provoking", "Cyclopean");
    megabean.addConditionalEffect("Energizing", "Cyclopean");
    megabean.addConditionalEffect("Focused", "Disorienting");
    megabean.addConditionalEffect("Shrinking", "Electrifying");
    megabean.addConditionalEffect("Thought-Provoking", "Energizing");
    megabean.addConditionalEffect("Seizure-Inducing", "Focused");
    megabean.addConditionalEffect("Calming", "Glowing");
    megabean.addConditionalEffect("Athletic", "Laxative");
    megabean.addConditionalEffect("Jennerising", "Paranoia");
    megabean.addConditionalEffect("Slippery", "Toxic");
    ingredients.push(megabean);

    const horsesemen = new Ingredient("Horse Semen");
    horsesemen.addBaseEffect("Long Faced");
    horsesemen.addConditionalEffect("Anti-Gravity", "Calming");
    horsesemen.addConditionalEffect("Thought-Provoking", "Electrifying");
    horsesemen.addConditionalEffect("Gingeritis", "Refreshing");
    ingredients.push(horsesemen);

    const donut = new Ingredient("Donut");
    donut.addBaseEffect("Calorie-Dense");
    donut.addConditionalEffect("Shrinking", "Energizing");
    donut.addConditionalEffect("Focused", "Euphoric");
    donut.addConditionalEffect("Calorie-Dense", "Explosive");
    donut.addConditionalEffect("Jennerising", "Gingeritis");
    donut.addConditionalEffect("Anti-Gravity", "Slippery");
    donut.addConditionalEffect("Balding", "Sneaky");
    ingredients.push(donut);

    const addy = new Ingredient("Addy");
    addy.addBaseEffect("Thought-Provoking");
    addy.addConditionalEffect("Long Faced", "Electrifying");
    addy.addConditionalEffect("Foggy", "Energizing");
    addy.addConditionalEffect("Explosive", "Euphoric");
    addy.addConditionalEffect("Sedating", "Gingeritis");
    addy.addConditionalEffect("Glowing", "Refreshing");
    ingredients.push(addy);

    const iodine = new Ingredient("Iodine");
    iodine.addBaseEffect("Jennerising");
    iodine.addConditionalEffect("Calorie-Dense", "Gingeritis");
    iodine.addConditionalEffect("Foggy", "Paranoia");
    iodine.addConditionalEffect("Calming", "Sedating");
    iodine.addConditionalEffect("Euphoric", "Seizure-Inducing");
    iodine.addConditionalEffect("Toxic", "Sneaky");
    iodine.addConditionalEffect("Refreshing", "Thought-Provoking");
    ingredients.push(iodine);

    return ingredients;
  }
}