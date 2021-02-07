import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import { useAddUserFood } from "hooks/useFood";
import CountryDropdown from "components/shared/CountryDropdown";
import ServingOptionItem from "./ServingOptionItem";

export default function CreateFoodForm({ setShowCreateFoodForm }) {
  const addUserFoodMutation = useAddUserFood();

  function handleSubmit(values) {
    console.log({ values });
    // addUserFoodMutation.mutate();
  }

  return (
    <Formik
      initialValues={{
        isLiquid: "false",
        isCal: "false",
        servingOptions: [{ servingName: "", servingSize: 0 }],
      }}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({ values }) => (
        <Form className="relative">
          <fieldset>
            <button
              className="absolute top-0 right-0 border-2 border-blue-500 rounded-full w-8 h-8 font-bold bg-blue-500 text-white hover:text-blue-500 hover:bg-white"
              onClick={() => setShowCreateFoodForm(false)}
            >
              X
            </button>
            <legend>
              <h6 className="text-gray-700">Create Food</h6>
            </legend>
            <label htmlFor="name">Name</label>
            <Field name="name" placeholder="Eggs" autoComplete="off" />

            <label htmlFor="brand">Brand</label>
            <Field name="brand" placeholder="Doe" autoComplete="off" />

            <div className="grid grid-cols-5 gap-1">
              <div className="col-span-3">
                <label htmlFor="perServeSize">
                  Per Serve Size
                  <Field
                    className="block w-full"
                    name="perServeSize"
                    placeholder="Doe"
                    type="number"
                    min="1"
                    max="10000"
                  />
                </label>
              </div>
              <div className="col-span-2 flex justify-between pt-6 px-4">
                <label htmlFor="g">
                  <Field name="isLiquid" value="false" type="radio" /> g
                </label>
                <label htmlFor="mL">
                  <Field name="isLiquid" value="true" type="radio" /> mL
                </label>
              </div>
            </div>

            <label htmlFor="barcode">Barcode</label>
            <Field name="barcode" placeholder="Doe" autoComplete="off" />
          </fieldset>
          <br />
          <fieldset>
            <legend>
              <h6 className="text-gray-700">Macros Per Serve</h6>
            </legend>
            <div className="grid grid-cols-5 gap-1">
              <div className="col-span-3">
                <label htmlFor="EnergyKJ">
                  EnergyKJ
                  <Field
                    name="EnergyKJ"
                    className="block w-full"
                    type="number"
                    min="1"
                    max="10000"
                  />
                </label>
              </div>
              <div className="col-span-2 flex justify-between pt-6 px-4">
                <label htmlFor="KJ">
                  <Field name="isCal" value="false" type="radio" /> KJ
                </label>
                <label htmlFor="Cal">
                  <Field name="isCal" value="true" type="radio" /> Cal
                </label>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-1">
              <label htmlFor="ProteinG">
                Protein (g)
                <Field name="ProteinG" type="number" min="1" max="10000" />
              </label>

              <label htmlFor="FatTotalG">
                FatTotal (g)
                <Field name="FatTotalG" type="number" min="1" max="10000" />
              </label>

              <label htmlFor="saturatedG">
                saturated (g)
                <Field name="saturatedG" type="number" min="1" max="10000" />
              </label>

              <label htmlFor="CarbohydrateG">
                Carbs (g)
                <Field name="CarbohydrateG" type="number" min="1" max="10000" />
              </label>

              <label htmlFor="sugarsG">
                sugars (g)
                <Field name="sugarsG" type="number" min="1" max="10000" />
              </label>

              <label htmlFor="fibreG">
                fibre (g)
                <Field name="fibreG" type="number" min="1" max="10000" />
              </label>

              <label htmlFor="SodiumMg">
                Sodium (mg)
                <Field name="SodiumMg" type="number" min="1" max="10000" />
              </label>

              <label htmlFor="calciumMg">
                calcium (mg)
                <Field name="calciumMg" type="number" min="1" max="10000" />
              </label>

              <label htmlFor="glutenG">
                gluten (g)
                <Field name="glutenG" type="number" min="1" max="10000" />
              </label>
            </div>
          </fieldset>
          <br />
          <fieldset>
            <legend>
              <h6 className="text-gray-700">Serving Options</h6>
            </legend>
            <FieldArray
              name="servingOptions"
              render={({ remove, push }) => (
                <ul>
                  {values.servingOptions.map((option, index) => (
                    <ServingOptionItem
                      key={index}
                      index={index}
                      remove={remove}
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() => push({ servingName: "", servingSize: 0 })}
                    className="w-full bg-green-500 text-white font-bold mt-1 rounded-sm hover:bg-green-300"
                  >
                    +
                  </button>
                </ul>
              )}
            />
          </fieldset>
          <br />
          <label htmlFor="country">
            Country
            <Field
              name="country"
              className="block w-full col-span-1"
              as={CountryDropdown}
            />
          </label>
          <br />
          <button type="submit">Send it</button>
        </Form>
      )}
    </Formik>
  );
}
