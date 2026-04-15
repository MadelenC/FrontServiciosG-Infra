import { useState, useEffect } from "react";
import JobApplicationRow from "./JobApplicationRow";
import SearchBar from "../Search/SearchBar";
import Pagination from "./Pagination";
import { FiPlus } from "react-icons/fi";

import { useJobApplicationStore } from "../../../zustand/useJobApplicationStore";
import { useVehicleStore } from "../../../zustand/useVehicleStore";
import { useAccessoriesStore } from "../../../zustand/useAccessoriesStore";
import { useUserStore } from "../../../zustand/userStore";
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
  const { users, fetchUsers } = useUserStore();

  const [chofer, setChofer] = useState("");
  const [vehiculo, setVehiculo] = useState("");
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
    fetchUsers();
  }, []);

  useEffect(() => setPage(1), [search, chofer, vehiculo]);

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
      alert("Actualización exitosa");
    }
    return res;
  };

  // Filtrado combinando chofer, vehículo y búsqueda general
  const choferes = users?.filter(u => u.tipo && u.tipo.toLowerCase() === "chofer") || [];

  const filtered = applications.filter((a) => {
    const choferNombre = a.chofer
      ? `${a.chofer.nombres || ""} ${a.chofer.apellidos || ""}`.toLowerCase()
      : "";

    const matchChofer = chofer
      ? choferNombre.includes(chofer.toLowerCase())
      : true;

    const idVehiculo = a.vehiculo?.id ? String(a.vehiculo.id) : "";
    const tipoVehiculo = a.vehiculo?.tipog ? String(a.vehiculo.tipog).toLowerCase() : "";
    const matchVehiculo = vehiculo
      ? idVehiculo === vehiculo || tipoVehiculo.includes(vehiculo.toLowerCase())
      : true;

    const searchLower = search.toLowerCase();
    const matchSearch = searchLower
      ? a.descripcion?.toLowerCase().includes(searchLower) || choferNombre.includes(searchLower)
      : true;

    return matchChofer && matchVehiculo && matchSearch;
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
        <SearchBar
          chofer={chofer}
          setChofer={setChofer}
          vehiculo={vehiculo}
          setVehiculo={setVehiculo}
          listaChoferes={choferes.map(c => ({
            value: `${c.nombres} ${c.apellidos}`,
            label: `${c.nombres} ${c.apellidos}`
          }))}
          listaVehiculos={vehicles}
          search={search}
          setSearch={setSearch}
        />

        <button
          onClick={handleOpenCreate}
         className="flex items-center gap-3
             bg-gradient-to-r from-blue-600 to-blue-500
             hover:from-blue-700 hover:to-blue-600
             text-white px-5 py-3 rounded-lg shadow-lg font-medium
             focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2
             transition-all duration-300
             hover:scale-105 active:scale-95
             mb-4"  
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
                  index={(page - 1) * limit + i + 1}
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
          accesorios={accessories}
        />
      )}
    </div>
  );
}