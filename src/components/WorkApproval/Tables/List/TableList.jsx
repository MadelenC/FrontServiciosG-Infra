import React from "react";
import ListRow from "./ListRow";

export default function TableList({
  data = [],
  onAction,
}) {
  return (
    <div className="overflow-x-auto rounded-xl border shadow-sm">

      <table className="w-full text-sm">

        <thead>
          <tr>
            {[
              "#",
              "N°",
              "Sección",
              "Descripción",
              "Taller",
              "Aprobación",
              "Fecha Envío",
              "Operación"
            ].map((h) => (
              <th key={h} className="border px-3 py-2 text-left">
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <ListRow
                key={item.id}
                item={item}
                index={index + 1}
                onAction={onAction}
              />
            ))
          ) : (
            <tr>
              <td colSpan={8} className="text-center py-4">
                No hay registros
              </td>
            </tr>
          )}
        </tbody>

      </table>

    </div>
  );
}