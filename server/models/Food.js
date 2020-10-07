import { Schema, model, mongo } from "mongoose";

const FoodSchema = new Schema({
  name: { type: String, required: true },
  brand: String,
  servingOptions: [{ servingName: String, servingSize: Number }],
  isLiquid: Boolean,
  perServeSize: Number,
  macrosPerServe: {
    EnergyKJ: { type: Number, required: true },
    ProteinG: { type: Number, default: 0 },
    FatTotalG: { type: Number, default: 0 },
    saturatedG: { type: Number, default: 0 },
    CarbohydrateG: { type: Number, default: 0 },
    sugarsG: { type: Number, default: 0 },
    fibreG: { type: Number, default: 0 },
    SodiumMg: { type: Number, default: 0 },
    calciumMg: { type: Number, default: 0 },
    glutenG: { type: Number, default: 0 },
  },
});

export default Food = model("food", FoodSchema);
