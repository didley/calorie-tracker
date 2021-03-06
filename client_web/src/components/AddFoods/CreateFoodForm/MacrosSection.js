import React from "react";
import { Field } from "formik";

export default function MacrosSection() {
  return (
    <div className="grid grid-cols-3 gap-1">
      <label htmlFor="macrosPerServe.ProteinG">
        Protein (g)
        <Field
          name="macrosPerServe.ProteinG"
          type="number"
          min="0"
          max="10000"
          step=".1"
        />
      </label>

      <label htmlFor="macrosPerServe.FatTotalG">
        FatTotal (g)
        <Field
          name="macrosPerServe.FatTotalG"
          type="number"
          min="0"
          max="10000"
          step=".1"
        />
      </label>

      <label htmlFor="macrosPerServe.saturatedG">
        saturated (g)
        <Field
          name="macrosPerServe.saturatedG"
          type="number"
          min="0"
          max="10000"
          step=".1"
        />
      </label>

      <label htmlFor="macrosPerServe.CarbohydrateG">
        Carbs (g)
        <Field
          name="macrosPerServe.CarbohydrateG"
          type="number"
          min="0"
          max="10000"
          step=".1"
        />
      </label>

      <label htmlFor="macrosPerServe.sugarsG">
        sugars (g)
        <Field
          name="macrosPerServe.sugarsG"
          type="number"
          min="0"
          max="10000"
          step=".1"
        />
      </label>

      <label htmlFor="macrosPerServe.fibreG">
        fibre (g)
        <Field
          name="macrosPerServe.fibreG"
          type="number"
          min="0"
          max="10000"
          step=".1"
        />
      </label>

      <label htmlFor="macrosPerServe.SodiumMg">
        Sodium (mg)
        <Field
          name="macrosPerServe.SodiumMg"
          type="number"
          min="0"
          max="10000"
        />
      </label>

      <label htmlFor="macrosPerServe.calciumMg">
        calcium (mg)
        <Field
          name="macrosPerServe.calciumMg"
          type="number"
          min="0"
          max="10000"
          step=".1"
        />
      </label>

      <label htmlFor="macrosPerServe.glutenG">
        gluten (g)
        <Field
          name="macrosPerServe.glutenG"
          type="number"
          min="0"
          max="10000"
          step=".1"
        />
      </label>
    </div>
  );
}
