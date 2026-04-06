import React from "react";
import DesktopRow from "./DesktopRow";

export default function TableDesktop({ data, onAction }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
      <table className="w-full text-sm bg-white border-collapse">
        
        <thead className="bg-gradient-to-r from-blue-50 to-blue-100">
          <tr>
            {["#", "Nombre", "Motivo", "Fecha", "Operación"].map((header) => (
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
          {data?.length > 0 ? (
            data.map((item, index) => (
              <DesktopRow
                key={item.id}
                item={item}
                index={index + 1}
                onAction={onAction}
              />
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-4 text-gray-500">
                No hay registros
              </td>
            </tr>
          )}
        </tbody>

      </table>
    </div>
  );
}