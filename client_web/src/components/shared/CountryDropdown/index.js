import React from "react";
import { CountryDropdown as CountryDropdownPkg } from "react-country-region-selector";

const countries = [
  { countryName: "Australia", alpha3Code: "AUS" },
  { countryName: "United Kingdom", alpha3Code: "GBR" },
  { countryName: "United States of America", alpha3Code: "USA" },
];

export default function CountryDropdown(props) {
  return (
    <select {...props}>
      <option value={null}>Select a country</option>
      {countries.map(({ alpha3Code, countryName }) => (
        <option key={alpha3Code} value={alpha3Code}>
          {countryName}
        </option>
      ))}
      <option value="OTHER">Other</option>
    </select>
  );
}
