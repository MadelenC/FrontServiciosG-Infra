import React from "react";
import RechRow from "./RechRow";

export default function TableRecha({
  data = [],
  onAction,
}) {
  return (
    <div className="overflow-x-auto rounded-xl border shadow-sm">

      <table className="w-full text-sm">

        {/* HEADER */}
        <thead className="bg-gray-100">
          <tr>
            {[
              "#",
              "N°",
              "Sección",
              "Descripción",
              "Taller",
              "Aprobación",
              "Informe",
              "Operaciones"
            ].map((h) => (
              <th key={h} className="border px-3 py-2 text-left">
                {h}
              </th>
            ))}
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <RechRow
                key={item.id}
                item={item}
                index={index + 1}
                onAction={onAction}
              />
            ))
          ) : (
            <tr>
              <td colSpan={8} className="text-center py-4 text-gray-500">
                No hay registros
              </td>
            </tr>
          )}
        </tbody>

      </table>

    </div>
  );
}