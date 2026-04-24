import { HiOutlineDocumentReport } from "react-icons/hi";
import { useState, useEffect } from "react";
import ListRow from "./ListRow";
import Pagination from "../Pagination";
import SearchBar from "../../Search/SearchBar";

import { useMaintenanceStore } from "../../../../zustand/useMaintenanceStore";
import { useInstitutionStore } from "../../../../zustand/useInstitutionStore";

import ReportApproval from "../../Form/ReportApprovalFrom";

export default function ListTable() {

  const {
    maintenances,
    fetchMaintenances,
    editMaintenance
  } = useMaintenanceStore();

  const { institutions, fetchInstitutions } = useInstitutionStore();

  const [search, setSearch] = useState("");
  const [taller, setTaller] = useState("");
  const [institution, setInstitution] = useState("");
  const [page, setPage] = useState(1);

  const [openReport, setOpenReport] = useState(false);

  const limit = 8;

  useEffect(() => {
    fetchMaintenances();
    fetchInstitutions();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search, taller, institution]);

  const handleAction = async (action, item) => {
    const newStatus =
      action === "accept" ? "aceptado" : "rechazado";

    await editMaintenance(item.id, {
      ...item,
      aprobacion: newStatus,
    });
  };

  const sorted = [...maintenances].sort((a, b) => b.id - a.id);

  const filtered = sorted.filter((item) => {
    const isPending =
      item.aprobacion?.toLowerCase() === "pendiente";

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

    return isPending && matchSearch && matchInstitution && matchTaller;
  });

  const totalPages = Math.ceil(filtered.length / limit);

  const currentData = filtered.slice(
    (page - 1) * limit,
    page * limit
  );

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-md p-4">

      {/* HEADER */}
      <div className="mb-4 flex items-center justify-between">

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

        {/* BOTÓN REPORTE */}
        <button
          onClick={() => setOpenReport(true)}
          className="w-10 h-10 flex items-center justify-center rounded-md bg-orange-500 hover:bg-orange-600 text-white shadow"
          title="Reporte"
        >
          <HiOutlineDocumentReport className="text-lg" />
        </button>

      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-xl border shadow-sm">
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
                "Fecha Envío",
                "Operación"
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
                <ListRow
                  key={item.id}
                  item={item}
                  index={(page - 1) * limit + i + 1}
                  onAction={handleAction}
                />
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-4 text-gray-500">
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

      {/* MODAL */}
      {openReport && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="relative w-full max-w-md">
            <ReportApproval onClose={() => setOpenReport(false)} />
          </div>
        </div>
      )}

    </div>
  );
}