import React from "react";
import KardexRow from "./kardexRow";

export default function TableKardex({
  maintenances,
  onActualizarKm,
  onRealizar,
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
      <table className="w-full text-sm bg-white border-collapse">
        <thead className="bg-gradient-to-r from-blue-50 to-blue-100">
          <tr>
            {[
              "#",
              "Vehículo",
              "Kilometraje",
              "Fecha",
              "Cantidad",
              "Unidad",
              "Trabajo",
              "Marca",
              "Código",
              "Repuesto",
              "Actualizar km",
              "Operación",
              "Devolución",
            ].map((header) => (
              <th
                key={header}
                className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-700"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {maintenances?.length > 0 ? (
            maintenances.map((m, index) => (
              <KardexRow
                key={m.id}
                maintenance={m}
                index={index + 1}
                onActualizarKm={onActualizarKm}
                onRealizar={onRealizar}
              />
            ))
          ) : (
            <tr>
              <td colSpan={13} className="text-center py-4 text-gray-500">
                No hay registros
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}