import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import validator from "validator";

const FoodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    brand: { type: String, trim: true },
    perServeSize: { type: Number, required: true },
    isLiquid: { type: Boolean, required: true },
    barcode: { type: Number },

    macrosPerServe: {
      EnergyKJ: { type: Number, required: true },
      ProteinG: { type: Number },
      FatTotalG: { type: Number },
      saturatedG: { type: Number },
      CarbohydrateG: { type: Number },
      sugarsG: { type: Number },
      fibreG: { type: Number },
      SodiumMg: { type: Number },
      calciumMg: { type: Number },
      glutenG: { type: Number },
    },
    servingOptions: [
      {
        servingName: { type: String, required: true, trim: true },
        servingSize: { type: Number, required: true },
      },
    ],
    country: {
      type: String,
      validate: [validator.isISO31661Alpha3, "Invalid country"],
      trim: true,
      uppercase: true,
      required: [true, "Country is required"],
    },
    isDeleted: { type: Boolean, default: false },
    isUserFood: { type: Boolean, required: true },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

FoodSchema.plugin(mongoosePaginate);

const Food = mongoose.model("food", FoodSchema);

export { Food };
