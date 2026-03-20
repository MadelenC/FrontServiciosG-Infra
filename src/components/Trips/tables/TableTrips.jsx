import React from "react";
import TripsRow from "./TripsRow";

export default function TableTrips({ trips, onOpenModal, onCancelTrip }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">

      <table className="w-full border-collapse text-sm bg-white">

        {/* HEADER IGUAL ESTILO CHECKBUDGET */}
        <thead className="bg-gradient-to-r from-blue-50 to-blue-100">
          <tr>
            {[
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
            ].map((head) => (
              <th
                key={head}
                className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-700"
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {trips.length > 0 ? (
            trips.map((trip) => (
              <TripsRow
                key={trip.id}
                trip={trip}
                onOpenModal={onOpenModal}
                onCancelTrip={onCancelTrip}
              />
            ))
          ) : (
            <tr>
              <td
                colSpan={10}
                className="text-center py-4 text-gray-500"
              >
                No se encontraron viajes.
              </td>
            </tr>
          )}
        </tbody>

      </table>

    </div>
  );
}