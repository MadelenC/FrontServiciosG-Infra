import React, { useEffect, useState } from "react";
import { useUserStore } from "../../../zustand/userStore";
import SearchBar from "../search/SearchBar";
import UserTable from "./UserTable";
import Pagination from "./Pagination";
import UserFormPanel from "../form/UserFormPanel";

export default function TableUser() {
  const {
    users = [],
    loading,
    error,
    page,
    limit,
    totalPages,
    fetchUsers,
    setPage,
    search = "",
    setSearch,
    roleFilter = "",
    setRoleFilter,
  } = useUserStore();

  const [openPanel, setOpenPanel] = useState(false);
  const [formType, setFormType] = useState(null); // inicializamos null

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  
  const sortedUsers = [...users].sort((a, b) => a.id - b.id);

  const currentUsers = sortedUsers
    .filter((u) => {
      const term = (search || "").toLowerCase();
      const matchesSearch =
        String(u.nombres || "").toLowerCase().includes(term) ||
        String(u.apellidos || "").toLowerCase().includes(term) ||
        String(u.cedula || "").toLowerCase().includes(term) ||
        String(u.celular || "").toLowerCase().includes(term);

      const matchesRole = roleFilter ? u.tipo === roleFilter : true;
      return matchesSearch && matchesRole;
    })
    .slice((page - 1) * limit, page * limit);

  if (loading)
    return (
      <div className="p-6 text-center text-gray-500 animate-pulse">
        Cargando usuarios...
      </div>
    );

  if (error)
    return (
      <div className="p-6 text-center text-red-500 font-semibold">
        Error: {error}
      </div>
    );

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition-all p-4">
      {/* Botón principal */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => { setOpenPanel(true); setFormType(null); }}
          className="flex items-center gap-2 border border-blue-500 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-all duration-200 font-medium"
        >
          <span className="text-lg font-bold">＋</span> Agregar Usuario
        </button>
      </div>

      {/* Buscador */}
      <SearchBar
        search={search}
        setSearch={setSearch}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
      />

      {/* Tabla de usuarios */}
      <UserTable users={currentUsers} />

      {/* Paginación */}
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />

      {/* Panel lateral con formulario */}
      <UserFormPanel
        open={openPanel}
        onClose={() => { setOpenPanel(false); setFormType(null); }}
        formType={formType}
        setFormType={setFormType} 
      />
    </div>
  );
}























