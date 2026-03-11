import React, { useState } from "react";
import { FaPlus, FaSave, FaPrint, FaSyncAlt } from "react-icons/fa";
import SearchBar from "../search/SearchBar";
import TableFuel from "./TableFuel";
import Pagination from "./Pagination";

export default function FuelTable() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const limit = 5;

  // 🔹 data de ejemplo (luego viene de API)
  const data = [
    {
      id: 1,
      solicitud: "001",
      pedido: "P-120",
      fecha: "2024-05-01",
      factura: "F-778",
      vehiculo: "ABC-123",
      gasolina: 50,
      diesel: 0,
      gnv: 20,
      total: 350,
    },
  ];

  // 🔹 search simple (global)
  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(search.toLowerCase())
    )
  );

  // 🔹 paginación
  const totalPages = Math.ceil(filteredData.length / limit);
  const currentData = filteredData.slice(
    (page - 1) * limit,
    page * limit
  );

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      {/* CABECERA */}
      <div className="flex justify-between items-center mb-4">
        {/* BOTONES */}
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm shadow-md font-sans">
            <FaSyncAlt className="w-4 h-4" />
            Actualizar Capital
          </button>

          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm shadow-md font-sans">
            <FaPlus className="w-4 h-4" />
            Agregar
          </button>

          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-700 hover:bg-purple-800 text-white text-sm shadow-md font-sans">
            <FaPrint className="w-4 h-4" />
            Imprimir
          </button>

          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm shadow-md font-sans">
            <FaSave className="w-4 h-4" />
            Guardar
          </button>
        </div>

        {/* SEARCH */}
        <div className="w-64">
          <SearchBar search={search} setSearch={setSearch} />
        </div>
      </div>

      {/* TABLA */}
      <TableFuel data={currentData} />

      {/* PAGINACIÓN */}
      <div className="flex justify-center mt-4">
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>
    </div>
  );
}
