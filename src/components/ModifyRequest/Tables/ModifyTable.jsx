import { useState, useEffect } from "react";
import ModifyRow from "./ModifyRow";
import Pagination from "./Pagination";
import { FaPrint } from "react-icons/fa";

import { useMaintenanceStore } from "../../../zustand/useMaintenanceStore";
import { useInstitutionStore } from "../../../zustand/useInstitutionStore";
import SearchBar from "../Search/SearchBar";
import EditMaintenanceForm from "../Form/EditModifyForm";

export default function ModifyTable() {

  const {
    maintenances,
    fetchMaintenances,
    removeMaintenance,
    editMaintenance,
  } = useMaintenanceStore();

  const {
    institutions,
    fetchInstitutions,
  } = useInstitutionStore();

  const [search, setSearch] = useState("");
  const [taller, setTaller] = useState("");
  const [institution, setInstitution] = useState("");
  const [page, setPage] = useState(1);

  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const limit = 8;

  useEffect(() => {
    fetchMaintenances();
    fetchInstitutions();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search, taller, institution]);

  // 🔥 ORDEN
  const sorted = [...maintenances].sort((a, b) => b.id - a.id);

  // 🔥 FILTRO
  const filtered = sorted.filter((item) => {

    const searchText = search.toLowerCase();

    const institucionNombre =
      item.institucion?.nombre?.toLowerCase() || "";

    const institucionId =
      item.institucion?.id;

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
      String(institucionId) === String(institution);

    const matchTaller =
      !taller ||
      itemTaller === taller.toLowerCase();

    return matchSearch && matchInstitution && matchTaller;
  });

  const totalPages = Math.ceil(filtered.length / limit);

  const currentData = filtered.slice(
    (page - 1) * limit,
    page * limit
  );

  // 🔥 ACCIONES
  const handleAction = (type, item) => {

    if (type === "edit") {
      setSelectedItem(item);
      setModalEditOpen(true);
    }

    if (type === "print") {
      window.print();
    }
  };

  const handleDelete = async (id) => {
    const res = await removeMaintenance(id);
    if (res?.ok) fetchMaintenances();
  };

  const handleUpdate = async (data) => {
    const res = await editMaintenance(selectedItem.id, data);
    if (res?.ok) {
      fetchMaintenances();
      setModalEditOpen(false);
    }
    return res;
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-md p-4">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3">

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
      <div className="overflow-x-auto rounded-xl border shadow-sm">

        <table className="w-full text-sm">

          <thead className="bg-gradient-to-r from-blue-50 to-blue-100">
            <tr>
              {["#", "N°", "Sección", "Descripción", "Taller", "Operación"].map((h) => (
                <th key={h} className="border px-3 py-2 text-left">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {currentData.length > 0 ? (
              currentData.map((item, i) => (
                <ModifyRow
                  key={item.id}
                  item={item}
                  index={(page - 1) * limit + i + 1}
                  onAction={handleAction}
                  institutions={institutions}
                />
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4">
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
      <EditMaintenanceForm
        isOpen={modalEditOpen}
        onClose={() => setModalEditOpen(false)}
        initialData={selectedItem}
        listaInstituciones={institutions}
        listaTalleres={[
          ...new Set(maintenances.map(m => m.taller).filter(Boolean))
        ].map((t, i) => ({ id: i, nombre: t }))}

        onSave={handleUpdate}
        onDelete={handleDelete}
      />

    </div>
  );
}