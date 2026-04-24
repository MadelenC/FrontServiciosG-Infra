import { useState, useEffect } from "react";
import AcepRow from "./AcepRow";
import Pagination from "../Pagination";
import SearchBar from "../../Search/SearchBar";

import { useMaintenanceStore } from "../../../../zustand/useMaintenanceStore";
import { useInstitutionStore } from "../../../../zustand/useInstitutionStore";
import { useAuthStore } from "../../../../zustand/AuthUsers";

export default function AcepTable() {

  const { maintenances, fetchMaintenances } = useMaintenanceStore();
  const { institutions, fetchInstitutions } = useInstitutionStore();
  const { user } = useAuthStore();

  const [search, setSearch] = useState("");
  const [taller, setTaller] = useState("");
  const [institution, setInstitution] = useState("");
  const [page, setPage] = useState(1);

  const limit = 8;

  useEffect(() => {
    fetchMaintenances();
    fetchInstitutions();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search, taller, institution]);

  // 🔥 SOLO ACEPTADOS DEL USUARIO LOGEADO
  const filtered = maintenances.filter((item) => {

    const isAccepted =
      item.aprobacion?.toLowerCase() === "aceptado";

    // ✔ CORRECCIÓN IMPORTANTE (antes faltaba o estaba mal)
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

    const matchTaller =
      !taller || itemTaller === taller.toLowerCase();

    const matchInstitution =
      !institution ||
      String(item.institucion?.id) === String(institution);

    return isAccepted && isOwner && matchSearch && matchTaller && matchInstitution;
  });

  const totalPages = Math.ceil(filtered.length / limit);

  const currentData = filtered.slice(
    (page - 1) * limit,
    page * limit
  );

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-md p-4">

      {/* SEARCH */}
      <div className="mb-4">
        <SearchBar
          search={search}
          setSearch={setSearch}
          taller={taller}
          setTaller={setTaller}
          institution={institution}
          setInstitution={setInstitution}
          listaTalleres={[
            ...new Set(maintenances.map(m => m.taller).filter(Boolean))
          ].map((t, i) => ({ id: i, nombre: t }))}
          listaInstituciones={institutions}
        />
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">

        <table className="w-full text-sm">

          <thead className="bg-gradient-to-r from-blue-50 to-blue-100">
            <tr>
              {[
                "#",
                "N°",
                "Sección",
                "Descripción",
                "Taller",
                "Aprobación",
                "Informe",
                "Operaciones"
              ].map((h) => (
                <th key={h} className="border px-3 py-2 text-left">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {currentData.length > 0 ? (
              currentData.map((item, i) => (
                <AcepRow
                  key={item.id}
                  item={item}
                  index={(page - 1) * limit + i + 1}
                />
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-4">
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