import React, { useEffect, useState } from "react";
import { useUserStore } from "../../../zustand/userStore";
import SearchBar from "../search/SearchBar";
import UserTable from "./UserTable";
import Pagination from "./Pagination";
import UserFormPanel from "../form/UserFormPanel";
import ReportUserForm from "../form/ReportUserForm";
import { HiOutlineDocumentReport } from "react-icons/hi";

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
  const [openReport, setOpenReport] = useState(false);
  const [formType, setFormType] = useState(null);

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
    <div className="rounded-xl border border-gray-200 bg-white shadow-md p-5">

      {/* TOOLBAR */}
      <div className="flex items-center justify-between mb-5 gap-4 flex-wrap">

        {/* SEARCH */}
        <div className="flex-1 min-w-[250px]">
          <SearchBar
            search={search}
            setSearch={setSearch}
            roleFilter={roleFilter}
            setRoleFilter={setRoleFilter}
          />
        </div>

        {/* BOTONES */}
        <div className="flex items-center gap-2">

          {/* REPORTE */}
          <button
            onClick={() => setOpenReport(true)}
            className="w-9 h-9 flex items-center justify-center rounded-md bg-orange-500 hover:bg-orange-600 text-white shadow-sm transition"
            title="Reporte"
          >
            <HiOutlineDocumentReport className="text-lg text-white" />
          </button>

          {/* AGREGAR */}
          <button
            onClick={() => {
              setOpenPanel(true);
              setFormType(null);
            }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-sm text-sm"
          >
            ＋ Agregar Usuario
          </button>

        </div>
      </div>

      {/* TABLE */}
      <UserTable users={currentUsers} />

      {/* PAGINATION */}
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />

      {/* PANEL USUARIO */}
      <UserFormPanel
        open={openPanel}
        onClose={() => {
          setOpenPanel(false);
          setFormType(null);
        }}
        formType={formType}
        setFormType={setFormType}
      />

      {/* MODAL REPORTE */}
      {openReport && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="relative w-full max-w-md">

            <button
              onClick={() => setOpenReport(false)}
              className="absolute top-2 right-3 text-gray-500"
            >
              ✕
            </button>

            <ReportUserForm
              users={users}
              onPrint={(tipo) => {
                console.log("Reporte:", tipo);
                setOpenReport(false);
              }}
            />
          </div>
        </div>
      )}

    </div>
  );
}






















