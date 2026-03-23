import React from "react";
import TripReportRow from "./TripReportRow";

export default function TableTripReport({
  tripReports,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">

      <table className="w-full text-sm bg-white border-collapse">

        {/* HEADER */}
        <thead className="bg-gradient-to-r from-blue-50 to-blue-100">
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
                className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-700"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {tripReports?.length > 0 ? (
            tripReports.map((trip, index) => (
              <TripReportRow
                key={trip.id}
                trip={trip}
                index={index + 1}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          ) : (
            <tr>
              <td colSpan={8} className="text-center py-4 text-gray-500">
                No se encontraron informes de viajes.
              </td>
            </tr>
          )}
        </tbody>

      </table>

    </div>
  );
}