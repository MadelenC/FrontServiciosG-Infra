import React from "react";
import JobApplicationRow from "./JobApplicationRow";

export default function TableApplication({
  applications,
  onOpenModal,
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
              "Chofer",
              "Vehículo",
              "Accesorios",
              "Descripción",
              "Fecha",
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
          {applications?.length > 0 ? (
            applications.map((app, index) => (
              <JobApplicationRow
                key={app.id}
                application={app}
                index={index + 1}
                onOpen={onOpenModal}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center py-4 text-gray-500">
                No se encontraron solicitudes.
              </td>
            </tr>
          )}
        </tbody>

      </table>

    </div>
  );
}