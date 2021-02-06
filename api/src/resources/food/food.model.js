import mongoose from "mongoose";
import validator from "validator";

const FoodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: String,
    perServeSize: Number,
    isLiquid: Boolean,
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
    servingOptions: [{ servingName: String, servingSize: Number }],
    country: {
      type: String,
      validate: [validator.isISO31661Alpha3, "Invalid country"],
      trim: true,
      uppercase: true,
      required: [true, "Country is required"],
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Food = mongoose.model("food", FoodSchema);
