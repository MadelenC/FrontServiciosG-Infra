import React, { useState, useEffect } from "react";
import CheckBudgetTable from "./CheckBudgetTable";
import CheckBudgetSearch from "../search/SearchBar";
import Pagination from "./Pagination";
import CheckBudgetForm from "../form/CheckBudgetForm"; 
// Datos de prueba
const dummyBudgets = [
  { id: 1, numPre: "001", chofer: "Juan", vehiculo: "Camion 1", entidad: "Interno" },
  { id: 2, numPre: "002", chofer: "Pedro", vehiculo: "Camion 2", entidad: "Externo" },
  { id: 3, numPre: "003", chofer: "Maria", vehiculo: "Camion 3", entidad: "Interno" },
  { id: 4, numPre: "004", chofer: "Luis", vehiculo: "Camion 4", entidad: "Externo" },
  { id: 5, numPre: "005", chofer: "Ana", vehiculo: "Camion 5", entidad: "Interno" },
  { id: 6, numPre: "006", chofer: "Carlos", vehiculo: "Camion 6", entidad: "Externo" },
];

export default function TableCheckBudget() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 3;

  // Estado para abrir formulario
  const [openForm, setOpenForm] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(null);

  // Resetear página al buscar
  useEffect(() => {
    setPage(1);
  }, [search]);

  // Filtrado
  const filteredBudgets = dummyBudgets.filter((b) => {
    const term = search.toLowerCase();
    return (
      b.numPre.toLowerCase().includes(term) ||
      b.chofer.toLowerCase().includes(term) ||
      b.vehiculo.toLowerCase().includes(term) ||
      b.entidad.toLowerCase().includes(term)
    );
  });

  const totalPages = Math.ceil(filteredBudgets.length / limit);
  const paginated = filteredBudgets.slice((page - 1) * limit, page * limit);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md p-4">
      
      {/* Buscador */}
      <CheckBudgetSearch search={search} setSearch={setSearch} />

      {/* Tabla */}
      <CheckBudgetTable 
        budgets={paginated} 
        onEdit={(budget) => {
          setSelectedBudget(budget); 
          setOpenForm(true);         
        }}
      />

      {/* Paginación */}
      <div className="mt-4">
        <Pagination 
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>

      {/* Formulario de edición */}
      {openForm && (
        <CheckBudgetForm 
          data={selectedBudget} 
          onClose={() => setOpenForm(false)}
        />
      )}
    </div>
  );
}