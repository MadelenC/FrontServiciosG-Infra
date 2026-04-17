import React from "react";
import ReservaRow from "./ReservaRow";

export default function ReservaTable({ reservas }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">

      <table className="w-full border-collapse text-sm bg-white dark:bg-gray-900">

        <thead className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900">
          <tr>
            {[
              "#",
              "Entidad",
              "Encargado",
              "Objetivo",
              "Pasajeros",
              "Inicio",
              "Final",
              "Días",
              "Operación",
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
          {reservas.length > 0 ? (
            reservas.map((reserva) => (
              <ReservaRow key={reserva.id} reserva={reserva} />
            ))
          ) : (
            <tr>
              <td
                colSpan={9}
                className="text-center py-6 text-gray-500 dark:text-gray-400"
              >
                No se encontraron reservas.
              </td>
            </tr>
          )}
        </tbody>

      </table>

    </div>
  );
}