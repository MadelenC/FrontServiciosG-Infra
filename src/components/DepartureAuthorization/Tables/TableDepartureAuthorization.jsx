import React from "react";
import DepartureAuthorizationRow from "./DepartureAuthorizationRow";

export default function TableDepartureAuthorization({
  departures,
  onOpenModal,
  onApprove,
  onReject,
  onDelete,
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">

      <table className="w-full text-sm bg-white border-collapse">

        {/* HEADER (MISMO ESTILO QUE TRIPS) */}
        <thead className="bg-gradient-to-r from-blue-50 to-blue-100">
          <tr>
            {[
              "#",
              "Chofer",
              "Movilidad",
              "Responsable",
              "Operaciones",
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
          {departures?.length > 0 ? (
            departures.map((departure, index) => (
              <DepartureAuthorizationRow
                key={departure.id}
                departure={departure}
                index={index + 1}
                onOpen={onOpenModal}
                onApprove={onApprove}
                onReject={onReject}
                onDelete={onDelete}
              />
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-4 text-gray-500">
                No se encontraron salidas.
              </td>
            </tr>
          )}
        </tbody>

      </table>

    </div>
  );
}