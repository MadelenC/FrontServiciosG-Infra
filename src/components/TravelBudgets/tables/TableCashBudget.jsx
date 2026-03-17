import React, { useState } from "react";
import CashBudgetTable from "./CashBudgetTable";
import CashBudgetSearch from "../search/SearchBar";
import Pagination from "./Pagination";

const dummyBudgets = [
  { id: 1, type: "cash", numPre: "001", chofer: "Juan", vehiculo: "Camion 1", entidad: "Interno" },
  { id: 2, type: "cash", numPre: "002", chofer: "Pedro", vehiculo: "Camion 2", entidad: "Externo" },
  { id: 3, type: "cash", numPre: "003", chofer: "Maria", vehiculo: "Camion 3", entidad: "Interno" },
  { id: 4, type: "cash", numPre: "004", chofer: "Luis", vehiculo: "Camion 4", entidad: "Externo" },
  { id: 5, type: "cash", numPre: "005", chofer: "Ana", vehiculo: "Camion 5", entidad: "Interno" },
  { id: 6, type: "cash", numPre: "006", chofer: "Carlos", vehiculo: "Camion 6", entidad: "Externo" },
];

export default function TableCashBudget() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 3; // elementos por página
  const [openPanel, setOpenPanel] = useState(false);

  const filteredBudgets = dummyBudgets
    .filter((b) => b.type === "cash")
    .filter((b) => {
      const term = search.toLowerCase();
      return (
        b.numPre.toLowerCase().includes(term) ||
        b.chofer.toLowerCase().includes(term) ||
        b.vehiculo.toLowerCase().includes(term)
      );
    });

  const totalPages = Math.ceil(filteredBudgets.length / limit);
  const paginated = filteredBudgets.slice((page - 1) * limit, page * limit);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md p-4">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setOpenPanel(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg shadow-lg"
        >
          <span className="text-lg font-bold">＋</span>
          Agregar Presupuesto
        </button>
      </div>

      <CashBudgetSearch search={search} setSearch={setSearch} />

      <CashBudgetTable budgets={paginated} />

      <div className="flex justify-center gap-3 mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-3 py-1">
          {page} / {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}