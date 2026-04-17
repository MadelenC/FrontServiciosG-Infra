import React from "react";
import MapsRow from "./MapsRow";

export default function TableMaps({ data, openModal }) {
  const headers = ["#", "Destino", "Título", "Latitud", "Longitud", "Operación"];

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">

      <table className="w-full border-collapse text-sm bg-white dark:bg-white/[0.03]">

        <thead className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900">

          <tr>
            {headers.map((head, idx) => (
              <th
                key={head}
                className={`border border-gray-200 dark:border-gray-700 px-3 py-2 text-left font-semibold text-gray-700 dark:text-gray-300
                  ${idx === 0 ? "w-10 text-center" : ""}
                  ${head === "Latitud" || head === "Longitud" ? "w-36 text-center" : ""}
                  ${head === "Operación" ? "w-28 text-center" : ""}`}
              >
                {head}
              </th>
            ))}
          </tr>

        </thead>

        <tbody>

          {data.length > 0 ? (
            data.map((item, index) => (
              <MapsRow
                key={item.id}
                item={item}
                index={index}
                openModal={openModal}
              />
            ))
          ) : (
            <tr>
              <td
                colSpan={headers.length}
                className="py-6 text-center text-gray-500 dark:text-gray-400"
              >
                No hay registros.
              </td>
            </tr>
          )}

        </tbody>

      </table>

    </div>
  );
}
