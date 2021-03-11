import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import validator from "validator";

const FoodSchema = {
  name: { type: String, required: true },
  brand: String,
  perServeSize: { type: Number, required: true },
  isLiquid: { type: Boolean, required: true },
  barcode: Number,

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
  servingOptions: [
    {
      servingName: { type: String, required: true },
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
};

const DbFoodSchema = new mongoose.Schema(
  { ...FoodSchema },
  { timestamps: true }
);
const UserFoodSchema = new mongoose.Schema(
  {
    ...FoodSchema,
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "user",
    },
  },
  { timestamps: true }
);

DbFoodSchema.plugin(mongoosePaginate);
UserFoodSchema.plugin(mongoosePaginate);

const UserFood = mongoose.model("userfood", UserFoodSchema);
const DbFood = mongoose.model("dbfood", DbFoodSchema);

export { UserFood, DbFood };
