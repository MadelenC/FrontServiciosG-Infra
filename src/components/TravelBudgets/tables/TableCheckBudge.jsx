import React, { useState, useEffect } from "react";
import CheckBudgetTable from "./CheckBudgetTable";
import CheckBudgetSearch from "../search/SearchBar";
import Pagination from "./Pagination";
import CheckBudgetForm from "../form/CheckBudgetForm";

import { useTravelBudgetsStore } from "../../../zustand/useTravelBudgetsStore";
import { useUserStore } from "../../../zustand/userStore";
import { useVehicleStore } from "../../../zustand/useVehicleStore";

export default function TableCheckBudget() {
  const { budgets, fetchBudgets } = useTravelBudgetsStore();
  const { users, fetchUsers } = useUserStore();
  const { vehicles, fetchVehicles } = useVehicleStore();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [openForm, setOpenForm] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const limit = 8;

  useEffect(() => {
    fetchBudgets();
    fetchUsers();
    fetchVehicles();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search]);

  // 🔥 CRUCE DE DATOS (IGUAL QUE TU "ENCARGADO")
  const enrichedBudgets = (budgets || []).map((b) => {
    const choferData = users.find((u) => u.id == b.chofer);
    const vehiculoData = vehicles.find((v) => v.id == b.vehiculo);

    return {
      ...b,
      choferNombre: choferData
        ? `${choferData.nombres} ${choferData.apellidos}`
        : "Sin chofer",

      vehiculoNombre: vehiculoData
        ? vehiculoData.placa
        : "Sin vehículo",
    };
  });

  const filteredBudgets = enrichedBudgets.filter((b) =>
    Object.values(b).some(
      (v) => v && String(v).toLowerCase().includes(search.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredBudgets.length / limit);
  const currentData = filteredBudgets.slice((page - 1) * limit, page * limit);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md p-4">
      
      <div className="h-10 w-64 mb-4">
        <CheckBudgetSearch search={search} setSearch={setSearch} />
      </div>

      <CheckBudgetTable 
        budgets={currentData} 
        onEdit={(budget) => {
          setSelectedBudget(budget);
          setOpenForm(true);
        }}
      />

      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <Pagination 
            page={page} 
            totalPages={totalPages} 
            setPage={setPage} 
          />
        </div>
      )}

      {openForm && (
        <CheckBudgetForm 
          data={selectedBudget} 
          onClose={() => setOpenForm(false)}
        />
      )}
    </div>
  );
}