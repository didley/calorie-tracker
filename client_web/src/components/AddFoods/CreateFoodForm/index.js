import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import { useAuth } from "hooks/useAuth";
import { useAddUserFood } from "hooks/useFood";
import CountryDropdown from "components/shared/CountryDropdown";
import MacrosSection from "./MacrosSection";
import ServingOptionItem from "./ServingOptionItem";
import ServingOptionsAddBtn from "./ServingOptionsAddBtn";
import { toCal, toKJ } from "utils/foodEnegy";
import { Button } from "components/shared/styling";

export default function CreateFoodForm({ setShowCreateFoodForm }) {
  const { user } = useAuth();
  const addUserFoodMutation = useAddUserFood();

  function handleSubmit(values) {
    const valuesCopy = { ...values };
    if (valuesCopy.isCal) {
      valuesCopy.macrosPerServe.EnergyKJ = toKJ(
        valuesCopy.macrosPerServe.EnergyKJ
      );
    }

    const { isCal, ...removedIsCal } = valuesCopy;

    addUserFoodMutation.mutate(removedIsCal);
  }

  return (
    <Formik
      initialValues={{
        name: "",
        brand: "",
        perServeSize: "",
        isLiquid: "false",
        barcode: "",
        macrosPerServe: {
          EnergyKJ: "",
          ProteinG: "",
          FatTotalG: "",
          saturatedG: "",
          CarbohydrateG: "",
          sugarsG: "",
          fibreG: "",
          SodiumMg: "",
          calciumMg: "",
          glutenG: "",
        },
        isCal: "false",
        servingOptions: [],
        country: user.country,
      }}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({ values, setFieldValue }) => (
        <Form className="relative">
          <fieldset>
            <button
              className="absolute top-0 right-0 text-center text-xs appearance-none text-gray-500 py-1 px-2 mx-1 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 hover:text-red-500 hover:bg-gray-200"
              onClick={() => setShowCreateFoodForm(false)}
            >
              Cancel
            </button>

            <legend>
              <h6 className="text-gray-700">Create Food</h6>
            </legend>
            <label htmlFor="name">Name</label>
            <Field
              name="name"
              placeholder="Meat Pie"
              autoComplete="off"
              required
            />

            <label htmlFor="brand">Brand</label>
            <Field
              name="brand"
              placeholder="Fred's Bakery"
              autoComplete="off"
            />

            <div className="grid grid-cols-5 gap-1">
              <div className="col-span-3">
                <label htmlFor="perServeSize">
                  Per Serve Size ({values.isLiquid === "true" ? "mL" : "g"})
                  <Field
                    className="block w-full"
                    name="perServeSize"
                    type="number"
                    min="1"
                    max="10000"
                    required
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
            <Field name="barcode" autoComplete="off" />
          </fieldset>
          <br />
          <fieldset>
            <legend>
              <h6 className="text-gray-700">Macros Per Serve</h6>
            </legend>
            <div className="grid grid-cols-5 gap-1">
              <div className="col-span-3">
                <label htmlFor="macrosPerServe.EnergyKJ">
                  Energy ({values.isCal === "true" ? "Cal" : "KJ"})
                  <Field
                    name="macrosPerServe.EnergyKJ"
                    className="block w-full"
                    type="number"
                    min="0"
                    max="10000"
                    step="1"
                    required
                  />
                </label>
              </div>
              <div className="col-span-2 flex justify-between pt-6 px-4">
                <label htmlFor="KJ">
                  <Field
                    name="isCal"
                    type="radio"
                    value="false"
                    onClick={() => {
                      if (values.isCal === "true") {
                        setFieldValue(
                          "macrosPerServe.EnergyKJ",
                          toKJ(values.macrosPerServe.EnergyKJ),
                          {
                            shouldValidate: false,
                          }
                        );
                      }
                      setFieldValue("isCal", "false", {
                        shouldValidate: false,
                      });
                    }}
                  />{" "}
                  KJ
                </label>
                <label htmlFor="Cal">
                  <Field
                    name="isCal"
                    type="radio"
                    value="true"
                    onClick={() => {
                      if (values.isCal === "false") {
                        setFieldValue(
                          "macrosPerServe.EnergyKJ",
                          toCal(values.macrosPerServe.EnergyKJ),
                          {
                            shouldValidate: false,
                          }
                        );
                      }
                      setFieldValue("isCal", "true", {
                        shouldValidate: false,
                      });
                    }}
                  />{" "}
                  Cal
                </label>
              </div>
            </div>
            <MacrosSection />
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
                  {values.servingOptions.map((_option, index) => (
                    <ServingOptionItem
                      key={index}
                      index={index}
                      remove={remove}
                      isLiquid={values.isLiquid === "true" ? true : false}
                    />
                  ))}
                  {values.servingOptions.length === 0 && (
                    <p>Eg. Slice, Large cup, Small Bowl</p>
                  )}
                  <ServingOptionsAddBtn
                    servingOptionsLength={values.servingOptions.length}
                    push={push}
                  />
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
          <div className="grid grid-cols-5 gap-2">
            <Button
              color="green"
              type="submit"
              className="col-start-5 col-span-2"
            >
              Create
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
