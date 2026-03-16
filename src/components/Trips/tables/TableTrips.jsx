import React from "react";
import TripsRow from "./TripsRow";

export default function TableTrips({ trips }) {
  const headers = [
    "#",
    "Entidad",
    "Tipo",    
    "Objetivo",
    "Días",
    "Pasajeros",
    "Fecha Inicial",
    "Fecha Final",
    "Estado",
    "Operaciones",
  ];

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
      <table className="w-full border-collapse text-sm bg-white">
        <thead className="bg-gradient-to-r from-blue-50 to-blue-100">
          <tr>
            {headers.map((head) => (
              <th
                key={head}
                className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-700"
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {trips.length > 0 ? (
            trips.map((trip) => (
              <TripsRow key={trip.id} trip={trip} />
            ))
          ) : (
            <tr>
              <td colSpan={headers.length} className="text-center py-4 text-gray-500">
                No hay registros
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}