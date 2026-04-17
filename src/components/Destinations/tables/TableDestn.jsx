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
    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">

      <table className="w-full min-w-[900px] table-fixed text-sm border-collapse bg-white dark:bg-gray-900">

        {/* HEADER */}
        <thead className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-800">

          <tr>
            {headers.map((h, idx) => (
              <th
                key={h}
                className={`border border-gray-200 dark:border-gray-700 px-3 py-2 text-left font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap overflow-hidden text-ellipsis
                  ${idx === 0 ? "w-8 text-center" : ""}
                  ${h === "Ruta" ? "w-64 truncate" : ""}
                  ${h === "Operaciones" ? "w-36 text-center" : ""}
                  ${h === "Distancia" ? "w-20 text-center" : ""}
                `}
              >
                {h}
              </th>
            ))}
          </tr>

        </thead>

        {/* BODY */}
        <tbody>

          {data.length > 0 ? (
            data.map((item, index) => (
              <DestRow key={item.id} item={item} index={index} />
            ))
          ) : (
            <tr>
              <td
                colSpan={headers.length}
                className="py-4 text-center text-gray-500 dark:text-gray-400"
              >
                No hay registros
              </td>
            </tr>
          )}

        </tbody>

      </table>

    </div>
  );
}