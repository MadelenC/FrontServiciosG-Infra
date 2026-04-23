import React from "react";
import AcepRow from "./AcepRow";

export default function TableRech({ data = [] }) {
  return (
    <div className="overflow-x-auto rounded-xl border">

      <table className="w-full text-sm">

        <thead>
          <tr>
            {[
              "#",
              "N°",
              "Sección",
              "Descripción",
              "Taller",
              "Informe"
            ].map((h) => (
              <th key={h} className="border px-3 py-2 text-left">
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((item, i) => (
              <AcepRow
                key={item.id}
                item={item}
                index={i + 1}
              />
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center py-4">
                No hay registros
              </td>
            </tr>
          )}
        </tbody>

      </table>

    </div>
  );
}