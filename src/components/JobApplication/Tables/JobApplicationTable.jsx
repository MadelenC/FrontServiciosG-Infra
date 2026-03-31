import { useState, useEffect } from "react";
import JobApplicationRow from "./JobApplicationRow";
import SearchBar from "../Search/SearchBar";
import Pagination from "./Pagination";
import { FiPlus } from "react-icons/fi";

import { useJobApplicationStore } from "../../../zustand/useJobApplicationStore";
import { useVehicleStore } from "../../../zustand/useVehicleStore";
import { useAccessoriesStore } from "../../../zustand/useAccessoriesStore";
import CreateJobApplicationForm from "../Form/CreateJobApplicationForm";


export default function JobApplicationTable() {

  const {
    applications,
    fetchApplications,
    addApplication,
    editApplication,
  } = useJobApplicationStore();

  const { vehicles, fetchVehicles } = useVehicleStore();
  const { accessories, fetchAccessories } = useAccessoriesStore();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [modalType, setModalType] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const limit = 8;

  useEffect(() => {
    fetchApplications();
    fetchVehicles();
     fetchAccessories(); 
  }, []);


  useEffect(() => setPage(1), [search]);

  const handleOpenCreate = () => {
    setModalType("add");
  };

  const handleEdit = (app) => {
    setSelectedApplication(app);
    setEditOpen(true);
  };

  const handleCloseEdit = () => {
    setEditOpen(false);
    setSelectedApplication(null);
  };

  const handleSaveCreate = async (data) => {
    const res = await addApplication(data);
    if (res?.ok) fetchApplications();
    return res;
  };

  const handleSaveEdit = async (data) => {
    const res = await editApplication(selectedApplication.id, data);
    if (res?.ok) {
      fetchApplications();
      alert("✅ Actualización exitosa");
    }
    return res;
  };

  // 🔍 FILTRO
  const filtered = applications.filter(a => {
    const searchLower = search.toLowerCase();

    return (
      a.chofer?.toLowerCase().includes(searchLower) ||
      a.descripcion?.toLowerCase().includes(searchLower)
    );
  });

  const totalPages = Math.ceil(filtered.length / limit);

  const currentData = filtered.slice(
    (page - 1) * limit,
    page * limit
  );

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md p-4">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">

        <SearchBar search={search} setSearch={setSearch} />

        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          <FiPlus size={18} />
          Agregar Solicitud
        </button>

      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">

        <table className="w-full text-sm">

          <thead className="bg-gradient-to-r from-blue-50 to-blue-100">
            <tr>
              <th className="border px-3 py-2">#</th>
              <th className="border px-3 py-2">Chofer</th>
              <th className="border px-3 py-2">Vehículo</th>
              <th className="border px-3 py-2">Accesorios</th>
              <th className="border px-3 py-2">Descripción</th>
              <th className="border px-3 py-2">Fecha</th>
              <th className="border px-3 py-2">Operación</th>
            </tr>
          </thead>

          <tbody>
            {currentData.length > 0 ? (
              currentData.map((a, i) => (
                <JobApplicationRow
                  key={a.id}
                  application={a}
                  index={i + 1}
                  onEdit={handleEdit}
                />
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500">
                  No hay registros
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center mt-4">
        <Pagination
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      </div>

      {/* CREATE MODAL */}
      {modalType === "add" && (
        <CreateJobApplicationForm
            isOpen={modalType === "add"}
            onClose={() => setModalType(null)}
            onSave={handleSaveCreate}
            vehiculos={vehicles}
            accesorios={accessories}  // esta es la variable correcta
        />
        )}
    </div>
  );
}