import React, { useState, useEffect } from "react";
import RepaymentRow from "./RepaymentRow";
import Pagination from "./Pagination";
import { FaPrint } from "react-icons/fa";

export default function RepaymentTable({ data, onAction }) {
  const [searchDate, setSearchDate] = useState(""); // <-- Declaración correcta
  const [page, setPage] = useState(1);
  const limit = 8;

  // Reset página al cambiar la fecha de búsqueda
  useEffect(() => {
    setPage(1);
  }, [searchDate]);

  // Filtrar datos por la fecha seleccionada
  const filteredData = data?.filter((item) => {
    if (!searchDate) return true;
    const itemDate = new Date(item.fecha).toISOString().split("T")[0];
    return itemDate === searchDate;
  }) || [];

  // Paginación
  const totalPages = Math.ceil(filteredData.length / limit);
  const currentData = filteredData.slice(
    (page - 1) * limit,
    page * limit
  );

  // Imprimir la tabla
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md p-4">
      
      {/* HEADER: buscador + imprimir */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
        <div className="flex gap-2 items-center">
          <label>
            Buscar por fecha:{" "}
            <input
              type="date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              className="border px-2 py-1 rounded"
            />
          </label>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          <FaPrint />
          Imprimir
        </button>
      </div>

      {/* TABLA */}
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-gradient-to-r from-blue-50 to-blue-100">
            <tr>
              {["#", "Serial", "Fecha", "Nombre", "Cantidad", "Detalle", "Vehiculo", "Operación"].map(
                (header) => (
                  <th
                    key={header}
                    className="border px-3 py-2 text-left font-bold"
                  >
                    {header}
                  </th>
                )
              )}
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
                <td colSpan={8} className="text-center py-4 text-gray-500">
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