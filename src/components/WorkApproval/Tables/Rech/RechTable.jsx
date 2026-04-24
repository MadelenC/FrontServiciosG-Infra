import { useState, useEffect } from "react";
import RechRow from "./RechRow";
import Pagination from "../Pagination";
import SearchBar from "../../Search/SearchBar";

import { useMaintenanceStore } from "../../../../zustand/useMaintenanceStore";
import { useInstitutionStore } from "../../../../zustand/useInstitutionStore";

import WorkRechForm from "../../Form/WorkRechForm";

export default function RechTable() {

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

  
  const [openForm, setOpenForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const limit = 8;

  useEffect(() => {
    fetchMaintenances();
    fetchInstitutions();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search, taller, institution]);

  
  const handleAction = async (action, item) => {

    // ABRIR FORMULARIO (INFORME)
    if (action === "reject") {
      setSelectedItem(item);
      setOpenForm(true);
      return;
    }

  
    if (action === "accept") {
      await editMaintenance(item.id, {
        ...item,
        aprobacion: "aceptado",
      });
    }
  };

  //  GUARDAR INFORME
  const handleSubmitForm = async (data) => {

    await editMaintenance(selectedItem.id, {
      ...selectedItem,
      informe: data.informe,
    });

    setOpenForm(false);
    setSelectedItem(null);
  };

  // SOLO RECHAZADOS
  const filtered = maintenances.filter((item) => {

    const isRejected = item.aprobacion === "rechazado";

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

    return isRejected && matchSearch && matchTaller && matchInstitution;
  });

  const totalPages = Math.ceil(filtered.length / limit);

  const currentData = filtered.slice(
    (page - 1) * limit,
    page * limit
  );

  return (
    <div className="relative overflow-hidden rounded-xl border bg-white shadow-md p-4">

      {/* SEARCH */}
      <SearchBar
        search={search}
        setSearch={setSearch}
        taller={taller}
        setTaller={setTaller}
        institution={institution}
        setInstitution={setInstitution}
        listaInstituciones={institutions}
      />

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
                <RechRow
                  key={item.id}
                  item={item}
                  index={(page - 1) * limit + i + 1}
                  onAction={handleAction}
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
      <Pagination
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />

      {/*  MODAL */}
      {openForm && selectedItem && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <WorkRechForm
            onClose={() => setOpenForm(false)}
            onSubmit={handleSubmitForm}
          />

        </div>
      )}

    </div>
  );
}