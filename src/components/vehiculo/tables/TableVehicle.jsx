import React from "react";
import VehicleRow from "./VehicleRow";

export default function TableVehicle({ vehicles }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">

      <table className="w-full border-collapse text-sm bg-white dark:bg-white/[0.03] table-fixed">

        <thead className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900">

          <tr>
            {[
              "ID",
              "Asignación",
              "Placa",
              "Asientos",
              "Tipo",
              "Kilometraje",
              "Estado",
              "Acciones",
            ].map((head) => (
              <th
                key={head}
                className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left font-semibold text-gray-700 dark:text-gray-300"
              >
                {head}
              </th>
            ))}
          </tr>

        </thead>

        <tbody>

          {vehicles.length > 0 ? (
            vehicles.map((vehicle) => (
              <VehicleRow key={vehicle.id} vehicle={vehicle} />
            ))
          ) : (
            <tr>
              <td
                colSpan={8}
                className="text-center py-4 text-gray-500 dark:text-gray-400"
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
