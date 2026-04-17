import React, { useState, useEffect } from "react";
import RepaymentRow from "./RepaymentRow";
import Pagination from "./Pagination";
import { FaPrint } from "react-icons/fa";

export default function RepaymentTable({ data, onAction }) {
  const [searchDate, setSearchDate] = useState("");
  const [page, setPage] = useState(1);
  const limit = 8;

  useEffect(() => {
    setPage(1);
  }, [searchDate]);

  const filteredData =
    data?.filter((item) => {
      if (!searchDate) return true;
      const itemDate = new Date(item.fecha).toISOString().split("T")[0];
      return itemDate === searchDate;
    }) || [];

  const totalPages = Math.ceil(filteredData.length / limit);
  const currentData = filteredData.slice(
    (page - 1) * limit,
    page * limit
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-md p-4">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">

        <div className="flex gap-2 items-center text-gray-700 dark:text-gray-200">
          <label>
            Buscar por fecha:{" "}
            <input
              type="date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              className="border px-2 py-1 rounded bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
            />
          </label>
        </div>

        <button
          onClick={handlePrint}
          className="
            flex items-center gap-3
            bg-gradient-to-r from-orange-600 to-orange-500
            hover:from-orange-700 hover:to-orange-600
            text-white px-5 py-3 rounded-lg shadow-lg font-medium
            focus:outline-none focus:ring-4 focus:ring-orange-400 focus:ring-offset-2
            transition-all duration-300
            hover:scale-105 active:scale-95
          "
        >
          <FaPrint />
          Imprimir
        </button>
      </div>

      {/* TABLA */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
        <table className="w-full text-sm">

          <thead className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700">
            <tr>
              {[
                "#",
                "Serial",
                "Fecha",
                "Nombre",
                "Cantidad",
                "Detalle",
                "Vehiculo",
                "Operación",
              ].map((header) => (
                <th
                  key={header}
                  className="border px-3 py-2 text-left font-bold text-gray-700 dark:text-gray-200 dark:border-gray-700"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {currentData.length ? (
              currentData.map((item, i) => (
                <RepaymentRow
                  key={item.id || i}
                  item={item}
                  index={(page - 1) * limit + i + 1}
                  onAction={onAction}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={8}
                  className="text-center py-4 text-gray-500 dark:text-gray-400"
                >
                  No hay registros
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

      {/* PAGINACIÓN */}
      <div className="flex justify-center mt-4">
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>
    </div>
  );
}