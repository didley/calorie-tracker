import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import { useAddUserFood } from "hooks/useFood";
import CountryDropdown from "components/shared/CountryDropdown";

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
            <Field
              id="name"
              name="name"
              placeholder="Eggs"
              autoComplete="off"
            />

            <label htmlFor="brand">Brand</label>
            <Field
              id="brand"
              name="brand"
              placeholder="Doe"
              autoComplete="off"
            />

            <div className="grid grid-cols-5 gap-1">
              <div className="col-span-3">
                <label htmlFor="perServeSize">
                  Per Serve Size
                  <Field
                    className="block w-full"
                    id="perServeSize"
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
            <Field
              id="barcode"
              name="barcode"
              placeholder="Doe"
              autoComplete="off"
            />
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
                    id="EnergyKJ"
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
                <Field
                  id="ProteinG"
                  name="ProteinG"
                  type="number"
                  min="1"
                  max="10000"
                />
              </label>

              <label htmlFor="FatTotalG">
                FatTotal (g)
                <Field
                  id="FatTotalG"
                  name="FatTotalG"
                  type="number"
                  min="1"
                  max="10000"
                />
              </label>

              <label htmlFor="saturatedG">
                saturated (g)
                <Field
                  id="saturatedG"
                  name="saturatedG"
                  type="number"
                  min="1"
                  max="10000"
                />
              </label>

              <label htmlFor="CarbohydrateG">
                Carbs (g)
                <Field
                  id="CarbohydrateG"
                  name="CarbohydrateG"
                  type="number"
                  min="1"
                  max="10000"
                />
              </label>

              <label htmlFor="sugarsG">
                sugars (g)
                <Field
                  id="sugarsG"
                  name="sugarsG"
                  type="number"
                  min="1"
                  max="10000"
                />
              </label>

              <label htmlFor="fibreG">
                fibre (g)
                <Field
                  id="fibreG"
                  name="fibreG"
                  type="number"
                  min="1"
                  max="10000"
                />
              </label>

              <label htmlFor="SodiumMg">
                Sodium (mg)
                <Field
                  id="SodiumMg"
                  name="SodiumMg"
                  type="number"
                  min="1"
                  max="10000"
                />
              </label>

              <label htmlFor="calciumMg">
                calcium (mg)
                <Field
                  id="calciumMg"
                  name="calciumMg"
                  type="number"
                  min="1"
                  max="10000"
                />
              </label>

              <label htmlFor="glutenG">
                gluten (g)
                <Field
                  id="glutenG"
                  name="glutenG"
                  type="number"
                  min="1"
                  max="10000"
                />
              </label>
            </div>
          </fieldset>
          <br />
          <fieldset>
            <legend>
              <h6 className="text-gray-700">Serving Options</h6>
            </legend>
            <FieldArray name="servingOptions">
              {({ remove, push }) => (
                <div>
                  {values.servingOptions.map((option, index) => (
                    <div className="flex" key={index}>
                      <button
                        className="flex-none h-auto mt-1 px-1 bg-gray-200 text-gray-800 mr-2 rounded-sm hover:text-white hover:bg-red-500"
                        type="button"
                        onClick={() => remove(index)}
                      >
                        X
                      </button>

                      <div className="flex-grow grid grid-cols-5 gap-2">
                        <label
                          htmlFor={`servingOptions.${index}.servingName`}
                          className="block pb-2 col-span-3"
                        >
                          Serving Name
                          <Field
                            id="servingName"
                            className="block w-full"
                            name={`servingOptions.${index}.servingName`}
                            placeholder="eg. Package, Container, Bowl full"
                            autoComplete="off"
                          />
                        </label>

                        <label
                          htmlFor={`servingOptions.${index}.servingSize`}
                          className="block col-span-2"
                        >
                          Serving Size
                          <Field
                            id="servingSize"
                            name={`servingOptions.${index}.servingSize`}
                            autoComplete="off"
                            type="number"
                            min="1"
                            max="10000"
                          />
                        </label>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => push({ servingName: "", servingSize: 0 })}
                    className="w-full bg-green-500 text-white font-bold mt-1 rounded-sm hover:bg-green-300"
                  >
                    +
                  </button>
                </div>
              )}
            </FieldArray>
          </fieldset>
          <br />
          <label htmlFor="country">
            Country
            <Field
              name="country"
              className="block w-full col-span-1"
              as={(props) => <CountryDropdown required {...props} />}
            />
          </label>
          <br />
        </Form>
      )}
    </Formik>
  );
}
