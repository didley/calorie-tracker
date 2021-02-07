import React from "react";
import countryList from "./countryListAlpha3";

const countryShortList = [
  {
    alpha3Code: "AUS",
    countryName: "Australia",
  },
  {
    alpha3Code: "CAN",
    countryName: "Canada",
  },
  {
    alpha3Code: "GBR",
    countryName: "United Kingdom of Great Britain and Northern Ireland (the)",
  },
  {
    alpha3Code: "NZL",
    countryName: "New Zealand",
  },
  {
    alpha3Code: "USA",
    countryName: "United States of America (the)",
  },
];

export default function CountryDropdown(props) {
  return (
    <select {...props}>
      <option key="selectACounty" value="" disabled>
        Select a country
      </option>
      <optgroup label="Popular">
        {countryShortList.map(({ alpha3Code, countryName }) => (
          <option key={alpha3Code} value={alpha3Code}>
            {countryName}
          </option>
        ))}
      </optgroup>
      <optgroup label="All">
        {countryList.map(({ alpha3Code, countryName }) => (
          <option key={alpha3Code} value={alpha3Code}>
            {countryName}
          </option>
        ))}
      </optgroup>
    </select>
  );
}
