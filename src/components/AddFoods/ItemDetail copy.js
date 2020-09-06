import React, { useMemo } from "react";
import { useTable } from "react-table";

export default function ItemDetail({ selected }) {
  const {
    CarbohydrateG,
    DietaryFibreTotal,
    EnergyKj,
    FatTotalG,
    ProteinG,
    SodiumMg,
    brand,
    glutenG,
    id,
    monounsaturatedG,
    name,
    polyunsaturatedG,
    saturatedG,
    sugarsG,
    transG,
  } = selected;

  const data = useMemo(() => [
    { col1: "Energy", col2: `${EnergyKj}kj` },
    { col1: "Protein", col2: `${ProteinG}g` },
    { col1: "- gluten", col2: `${glutenG}g` },
    { col1: "FatTotalG", col2: `${FatTotalG}g` },
    { col1: "- saturated", col2: `${saturatedG}g` },
    { col1: "- trans", col2: `${transG}g` },
    { col1: "- polyunsaturated", col2: `${polyunsaturatedG}g` },
    { col1: "- monounsaturated", col2: `${monounsaturatedG}g` },
    { col1: "Carbohydrate", col2: `${CarbohydrateG}g` },
    { col1: "- sugars", col2: `${sugarsG}g` },
    { col1: "Dietary Fibre, total", col2: `${DietaryFibreTotal}g` },
    { col1: "Sodium", col2: `${SodiumMg}mg` },
  ]);

  const columns = useMemo(
    () => [
      {
        Header: "",
        accessor: "col1", // accessor is the "key" in the data
      },
      {
        Header: "Quantity Per serving",
        accessor: "col2",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <div className="bg-white p-3 m-2 rounded-lg shadow-lg md:max-w-xl">
      <h3>Nutrition Information</h3>
      <hr />
      <p>{brand}</p>
      <h4>{name}</h4>
      <hr />

      <table {...getTableProps()} className="table-auto">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// import React from "react";

// export default function ItemDetail({ selected }) {
//   const {
//     CarbohydrateG,
//     DietaryFibreTotal,
//     EnergyKj,
//     FatTotalG,
//     ProteinG,
//     SodiumMg,
//     brand,
//     glutenG,
//     id,
//     monounsaturatedG,
//     name,
//     polyunsaturatedG,
//     saturatedG,
//     sugarsG,
//     transG,
//   } = selected;

//   return (
//     <div className="bg-white p-3 m-2 rounded-lg shadow-lg md:max-w-xl">
//       ItemDetail
//       <h3>Nutrition Information</h3>
//       <hr />
//       !selected ? <p>Select a</p>
//       <h4>{name}</h4>
//       <hr />
//       <table>
//         <thead>
//           <tr>
//             <th colSpan="2">
//               Quantity Per <br />
//               serving
//             </th>
//             <th>
//               % Daily Intake <br />
//               Per serving
//             </th>
//             <th>
//               Quantity <br />
//               Per 100g
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {CarbohydrateG && (
//             <tr>
//               <td>Carbohydrate</td>
//               <td>{CarbohydrateG}</td>
//             </tr>
//           )}
//           {DietaryFibreTotal && (
//             <tr>
//               <td> Dietary Fibre, total</td>
//               <td>{DietaryFibreTotal}</td>
//             </tr>
//           )}

//           {/*
//             <td> EnergyKj,</td>
//             <td> FatTotalG,</td>
//             <td> ProteinG,</td>
//             <td> SodiumMg,</td>
//             <td> brand,</td>
//             <td> glutenG,</td>
//             <td> id,</td>
//             <td> monounsaturatedG,</td>
//             <td> name,</td>
//             <td> polyunsaturatedG,</td>
//             <td> saturatedG,</td>
//             <td> sugarsG,</td>
//             <td> transG,</td> */}
//         </tbody>
//       </table>
//     </div>
//   );
// }
