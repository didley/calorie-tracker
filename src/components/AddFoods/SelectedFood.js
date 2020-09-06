import React from "react";

export default function SelectedFood({ selected }) {
  const {
    CarbohydrateG = 0,
    EnergyKj = 0,
    FatTotalG = 0,
    ProteinG = 0,
    SodiumMg = 0,
    brand = "-",
    name = "Select a food",
    saturatedG = 0,
  } = selected;

  return (
    <div className="bg-white p-3 m-2 rounded-lg shadow-lg md:max-w-sm">
      <h3>Selected Food</h3>
      <hr />
      <p>{brand}</p>
      <h4>{name}</h4>
      <hr />
      <table>
        <thead className="font-thin">
          <tr>
            <td>{EnergyKj}kJ</td>
            <td>Protein</td>
            <td>Fat</td>
            <td>saturated</td>
            <td>Carbs</td>
            <td>Sodium</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <hr />
              {EnergyKj}Cal
            </td>
            <td>
              <hr />
              {ProteinG}g
            </td>
            <td>
              <hr />
              {FatTotalG}g
            </td>
            <td>
              <hr />
              {saturatedG}g
            </td>
            <td>
              <hr />
              {CarbohydrateG}g
            </td>
            <td>
              <hr />
              {SodiumMg}mg
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
