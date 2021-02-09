import React from "react";
import { Field } from "formik";

export default function ServingOptionItem({ index, remove, required = false }) {
  return (
    <li className="flex">
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
            required={required}
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
            step=".1"
            min=".1"
            max="50"
            required={required}
          />
        </label>
      </div>
    </li>
  );
}
