import React from "react";
import FuelRow from "./FuelRow";

export default function TableFuel({ data }) {
  const headers = [
    "#",
    "Nro. Solicitud",
    "Nro. Pedido",
    "Fecha",
    "Factura",
    "Vehículo",
    "Gasolina",
    "Diésel",
    "GNV",
    "Total Bs.",
  ];

  return (
    <div className="overflow-x-auto w-full rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">

      <table className="min-w-[1000px] w-full text-sm border-collapse bg-white dark:bg-gray-900">

        <thead className="bg-blue-100 dark:bg-gray-800">
          <tr>
            {headers.map((head) => (
              <th
                key={head}
                className="px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 whitespace-nowrap"
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <FuelRow
                key={item.id}
                item={item}
                index={index + 1}
              />
            ))
          ) : (
            <tr>
              <td
                colSpan={headers.length}
                className="text-center py-10 text-gray-500 dark:text-gray-400"
              >
                No hay registros
              </td>
            </tr>
          )}
        </tbody>

      </table>

    </div>
  );
}
