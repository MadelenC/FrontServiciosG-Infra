import React from "react";
import DestRow from "./DestnRow";

export default function TableDest({ data }) {
  const headers = [
    "#",
    "Dpto. Inicio",
    "Origen",
    "Ruta",
    "Destino",
    "Dpto. Final",
    "Distancia",
    "Tiempo",
    "Operaciones",
  ];

  return (
    <div className="overflow-x-auto border border-gray-200 rounded-md">
      <table className="w-full table-fixed text-sm border-collapse">
        <thead className="bg-blue-100">
          <tr>
            {headers.map((h, idx) => (
              <th
                key={h}
                className={`px-3 py-2 text-left font-semibold border-b border-gray-300
                  ${idx === 0 ? "w-8 text-center" : ""} 
                  ${h === "Ruta" ? "w-64 truncate" : ""} 
                  ${h === "Operaciones" ? "w-36 text-center" : ""} 
                  ${h === "Distancia" ? "w-20 text-center " : ""}  
                `}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length ? (
            data.map((item, index) => (
              <DestRow key={item.id} item={item} index={index} />
            ))
          ) : (
            <tr>
              <td colSpan={headers.length} className="py-6 text-center text-gray-500">
                No hay registros
              </td>
            </tr>
          )} 
        </tbody>
      </table>
    </div>
  );
}
