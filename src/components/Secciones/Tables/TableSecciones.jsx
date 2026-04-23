import React from "react";
import SeccionesRow from "./SeccionesRow";

export default function TableSecciones({
  institutions,
}) {
  return (
    <div className="overflow-x-auto rounded-xl border shadow-sm">

      <table className="w-full text-sm">

        <thead>
          <tr>
            {["#", "Nombre", "Operación"].map((h) => (
              <th key={h} className="border px-3 py-2 text-left">
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {institutions?.length > 0 ? (
            institutions.map((inst, index) => (
              <SeccionesRow
                key={inst.id}
                institution={inst}   // ✅ CORREGIDO AQUÍ
                index={index + 1}
              />
            ))
          ) : (
            <tr>
              <td colSpan={3} className="text-center py-4">
                No hay instituciones
              </td>
            </tr>
          )}
        </tbody>

      </table>

    </div>
  );
}