// TableCashBudget.js
import React, { useState, useEffect } from "react";
import CashBudgetTable from "./CashBudgetTable";
import CashBudgetSearch from "../search/SearchBar";
import Pagination from "./Pagination";
import CashBudgetForm from "../form/CashBudgetForm";

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
  const [budgets, setBudgets] = useState(dummyBudgets);
  const [activeBudget, setActiveBudget] = useState(null); // fila seleccionada para editar
  const limit = 3;

  useEffect(() => {
    setPage(1);
  }, [search]);

  const filteredBudgets = budgets
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

  const handleEdit = (budget) => setActiveBudget(budget);
  const handleCloseForm = () => setActiveBudget(null);

  const handleSave = (updatedBudget) => {
    setBudgets(prev =>
      prev.map(b => b.id === updatedBudget.id ? updatedBudget : b)
    );
    setActiveBudget(null);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md p-4">

      {/* Buscador */}
      <CashBudgetSearch search={search} setSearch={setSearch} />

      {/* Tabla */}
      <CashBudgetTable budgets={paginated} onEdit={handleEdit} />

      {/* Paginación */}
      <div className="mt-4">
        <Pagination 
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>

      {/* Formulario de edición */}
      {activeBudget && (
        <CashBudgetForm 
          data={activeBudget} 
          onClose={handleCloseForm} 
          onSave={handleSave}
        />
      )}

    </div>
  );
}