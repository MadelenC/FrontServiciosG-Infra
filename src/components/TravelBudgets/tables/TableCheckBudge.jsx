import React, { useState, useEffect } from "react";
import CheckBudgetTable from "./CheckBudgetTable";
import CheckBudgetSearch from "../search/SearchBar";
import Pagination from "./Pagination"; // Componente de paginación real
import CheckBudgetForm from "../form/CheckBudgetForm"; 
import { useTravelBudgetsStore } from "../../../zustand/useTravelBudgetsStore"; 

export default function TableCheckBudget() {
  const { budgets, fetchBudgets } = useTravelBudgetsStore(); 

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [openForm, setOpenForm] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const limit = 8;

  useEffect(() => {
    fetchBudgets();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search]);

  // Filtrado de presupuestos según búsqueda
  const filteredBudgets = (budgets || []).filter((b) =>
    Object.values(b).some(
      (v) => v && String(v).toLowerCase().includes(search.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredBudgets.length / limit);
  const currentData = filteredBudgets.slice((page - 1) * limit, page * limit);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md p-4">
      
      {/* Buscador */}
      <div className="h-10 w-64 mb-4">
        <CheckBudgetSearch search={search} setSearch={setSearch} />
      </div>

      {/* Tabla con presupuestos paginados */}
      <CheckBudgetTable 
        budgets={currentData} 
        onEdit={(budget) => {
          setSelectedBudget(budget);
          setOpenForm(true);
        }}
      />

      {/* Paginación funcional */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <Pagination 
            page={page} 
            totalPages={totalPages} 
            setPage={setPage} 
          />
        </div>
      )}

      {/* Formulario modal para editar presupuesto */}
      {openForm && (
        <CheckBudgetForm 
          data={selectedBudget} 
          onClose={() => setOpenForm(false)}
        />
      )}
    </div>
  );
}