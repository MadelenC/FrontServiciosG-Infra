import React from "react";
import TripReportRow from "./TripReportRow";

export default function TableTripReport({
  tripReports,
  onEdit,
  onDelete,
  onUpdateKm,
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">

      <table className="w-full text-sm bg-white dark:bg-gray-900 border-collapse">

        <thead className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700">
          <tr>
            {[
              "#",
              "Vehículo",
              "Chofer",
              "Encargado",
              "Entidad",
              "Fecha de viaje",
              "Actualizar km.",
              "Operación",
            ].map((h) => (
              <th
                key={h}
                className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left font-semibold text-gray-700 dark:text-gray-300"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {tripReports?.length > 0 ? (
            tripReports.map((trip, index) => (
              <TripReportRow
                key={trip.id}
                trip={trip}
                index={index + 1}
                onUpdateKm={onUpdateKm}
              />
            ))
          ) : (
            <tr>
              <td
                colSpan={8}
                className="text-center py-4 text-gray-500 dark:text-gray-400"
              >
                No se encontraron informes.
              </td>
            </tr>
          )}
        </tbody>

      </table>

    </div>
  );
}