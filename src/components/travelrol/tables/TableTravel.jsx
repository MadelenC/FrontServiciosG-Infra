import React from "react";
import TravelRow from "./TravelRow";

export default function TableTravel({
  entidades,
  onViewExceptions,
  drivers
}) {
  const headers = [
    "ID",
    "Chofer",
    "Tipo A",
    "Tipo B",
    "Tipo C",
    "Excepciones",
    "Operaciones",
  ];

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">

      <table className="min-w-full text-sm border-collapse bg-white dark:bg-gray-900">

        {/* HEADER */}
        <thead className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-800">

          <tr>
            {headers.map((head) => (
              <th
                key={head}
                className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
              >
                {head}
              </th>
            ))}
          </tr>

        </thead>

        {/* BODY */}
        <tbody>

          {entidades.length > 0 ? (
            entidades.map((entitie) => (
              <TravelRow
                key={entitie.id}
                entitie={entitie}
                drivers={drivers}
                onViewExceptions={onViewExceptions}
              />
            ))
          ) : (
            <tr>
              <td
                colSpan={headers.length}
                className="text-center py-4 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700"
              >
                No se encontraron registros.
              </td>
            </tr>
          )}

        </tbody>

      </table>

    </div>
  );
}