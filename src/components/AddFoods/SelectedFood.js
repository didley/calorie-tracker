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
    <div className="bg-white p-3 m-2 rounded-lg shadow-lg">
      <div className="flex justify-between">
        <h3 className="my-auto">Selected Food</h3>
        <button className="bg-green-500 hover:bg-green-400 text-white font-bold py-1 px-4 border-b-4 border-green-700 hover:border-green-500 rounded">
          Add
        </button>
      </div>
      <hr className="my-2" />
      <p>{brand}</p>
      <h4>{name}</h4>
      <hr />
      <table className="mt-3">
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
