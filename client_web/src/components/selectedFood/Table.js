import React from "react";

export default function Table({ macros }) {
  console.log({ macros });
  const {
    CarbohydrateG = 0,
    EnergyKJ = 0,
    FatTotalG = 0,
    ProteinG = 0,
    SodiumMg = 0,
    saturatedG = 0,
  } = macros;

  return (
    <table className="mt-3">
      <thead className="font-thin text-sm">
        <tr>
          <td>{EnergyKJ}kJ</td>
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
            {Math.floor(EnergyKJ / 4.184)}Cal
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
  );
}
