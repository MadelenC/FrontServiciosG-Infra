import { useState, useEffect } from "react";
import ListRow from "./ListRow";
import Pagination from "../Pagination";
import SearchBar from "../../Search/SearchBar";

import { useMaintenanceStore } from "../../../../zustand/useMaintenanceStore";
import { useInstitutionStore } from "../../../../zustand/useInstitutionStore";
import { useAuthStore } from "../../../../zustand/AuthUsers";

import InsertForm from "../../Form/InsertForm";

export default function ListTable({ onAction }) {

  const { maintenances, fetchMaintenances, addMaintenance } =
    useMaintenanceStore();

  const { institutions, fetchInstitutions } =
    useInstitutionStore();

  const { user } = useAuthStore();

  const [search, setSearch] = useState("");
  const [taller, setTaller] = useState("");
  const [institution, setInstitution] = useState("");
  const [page, setPage] = useState(1);
  const [openForm, setOpenForm] = useState(false);

  const limit = 8;

  useEffect(() => {
    fetchMaintenances();
    fetchInstitutions();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search, taller, institution]);

  // 🔥 SOLO instituciones que el usuario realmente usa en mantenimientos
  const institucionesUsuario = [
    ...new Map(
      maintenances
        .filter(m => m.user?.id === user?.id)
        .map(m => m.institucion)
        .filter(Boolean)
        .map(inst => [inst.id, inst])
    ).values()
  ];

  const sorted = [...maintenances].sort((a, b) => b.id - a.id);

  const filtered = sorted.filter((item) => {

    const isPending =
      item.aprobacion?.toLowerCase() === "pendiente";

    const isOwner =
      item.user?.id === user?.id;

    const searchText = search.toLowerCase();

    const institucionNombre =
      item.institucion?.nombre?.toLowerCase() || "";

    const itemTaller =
      (item.taller || "").toLowerCase();

    const matchSearch =
      !search ||
      (item.descripcion || "").toLowerCase().includes(searchText) ||
      itemTaller.includes(searchText) ||
      institucionNombre.includes(searchText) ||
      String(item.id_nro || "").includes(searchText);

    const matchInstitution =
      !institution ||
      String(item.institucion?.id) === String(institution);

    const matchTaller =
      !taller ||
      itemTaller === taller.toLowerCase();

    return isPending && isOwner && matchSearch && matchInstitution && matchTaller;
  });

  const totalPages = Math.ceil(filtered.length / limit);

  const currentData = filtered.slice(
    (page - 1) * limit,
    page * limit
  );

  const handleSave = async (data) => {
    await addMaintenance({
      ...data,
      user_id: user?.id,
      aprobacion: "pendiente"
    });

    fetchMaintenances();
  };

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-md p-4">

      {/* CONTADOR */}
      <div className="mb-2 text-sm text-gray-600">
        Tienes{" "}
        <span className="font-bold">{filtered.length}</span>{" "}
        pendientes
      </div>

      {/* SEARCH + BOTÓN */}
      <div className="flex items-center justify-between mb-4">

        <div className="flex-1">
          <SearchBar
            search={search}
            setSearch={setSearch}
          />
        </div>

        <button
          onClick={() => setOpenForm(true)}
          className="flex items-center gap-3
            bg-gradient-to-r from-blue-600 to-blue-500
            hover:from-blue-700 hover:to-blue-600
            text-white px-4 py-3 rounded-lg shadow-lg font-medium ml-4"
        >
          + Insertar
        </button>

      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-xl border shadow-sm">
        <table className="w-full text-sm">

          <thead className="bg-gradient-to-r from-blue-50 to-blue-100">
            <tr>
              {["#", "Sección", "Descripción", "Taller", "Operación"].map((h) => (
                <th key={h} className="border px-3 py-2 text-left">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {currentData.length > 0 ? (
              currentData.map((item, i) => (
                <ListRow
                  key={item.id}
                  item={item}
                  index={(page - 1) * limit + i + 1}
                  onAction={onAction}
                />
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  No hay registros
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

      {/* PAGINACIÓN */}
      <div className="flex justify-center mt-4">
        <Pagination
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      </div>

      {/* FORM */}
      <InsertForm
        isOpen={openForm}
        onClose={() => setOpenForm(false)}
        onSave={handleSave}
        listaInstituciones={institucionesUsuario}
        listaTalleres={[
          ...new Set(maintenances.map(m => m.taller).filter(Boolean))
        ].map((t, i) => ({ id: i, nombre: t }))}
      />

    </div>
  );
}

