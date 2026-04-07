import React from "react";
import TravelRow from "./TravelRow";

export default function TableTravel({ entidades, onViewExceptions, drivers  }) {
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
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm border-collapse border-none">
        <thead className="bg-gradient-to-r from-blue-50 to-blue-100">
          <tr>
            {headers.map((head) => (
              <th
                key={head}
                className="px-4 py-3 text-left font-semibold text-gray-700"
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>

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
                className="text-center py-4 text-gray-500"
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
