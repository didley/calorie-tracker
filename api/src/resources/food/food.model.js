import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: String,
    servingOptions: [{ servingName: String, servingSize: Number }],
    isLiquid: Boolean,
    perServeSize: Number,
    barcode: Number,
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "user",
    },
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
  },
  { timestamps: true }
);

export const Food = mongoose.model("food", FoodSchema);
