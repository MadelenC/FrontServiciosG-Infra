import { useState, useEffect } from "react";
import DepartureAuthorizationRow from "./DepartureAuthorizationRow";
import SearchBar from "../Search/SearchBar";
import Pagination from "./Pagination";
import { FiPlus } from "react-icons/fi";

import { useDepartureAuthorizationStore } from "../../../zustand/useDepartureAuthorizationStore";
import { useUserStore } from "../../../zustand/userStore";
import { useVehicleStore } from "../../../zustand/useVehicleStore";

import CreateDepartureAuthorizationForm from "../Form/CreateDepartureAuthorizationForm";
import EditDepartureAuthorizationForm from "../Form/EditDepartureAuthorizationForm";

export default function DepartureAuthorizationTable({ externalDepartureId = null }) {

  const {
    departures,
    fetchDepartures,
    addDeparture,
    editDeparture,
  } = useDepartureAuthorizationStore();

  const { users, fetchUsers } = useUserStore();
  const { vehicles, fetchVehicles } = useVehicleStore();

  const choferes = users.filter(u => u.tipo === "chofer");

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [modalType, setModalType] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedDeparture, setSelectedDeparture] = useState(null);

  const limit = 8;

  useEffect(() => {
    fetchDepartures();
    fetchUsers();
    fetchVehicles();
  }, []);

  useEffect(() => setPage(1), [search]);

  const handleOpenCreate = () => setModalType("add");

  const handleEdit = (departure) => {
    setSelectedDeparture(departure);
    setEditOpen(true);
  };

  const handleCloseEdit = () => {
    setEditOpen(false);
    setSelectedDeparture(null);
  };

  const handleSaveCreate = async (data) => {
    const res = await addDeparture(data);
    if (res?.ok) fetchDepartures();
    return res;
  };

  const handleSaveEdit = async (data) => {
    const res = await editDeparture(selectedDeparture.id, data);
    if (res?.ok) {
      fetchDepartures();
      alert("✅ Actualizacion Exitosa");
    }
    return res;
  };

  const filtered = departures.filter(d => {
    const searchLower = search.toLowerCase();

    const matchesSearch =
      d.lugar?.toLowerCase().includes(searchLower) ||
      d.motivo?.toLowerCase().includes(searchLower) ||
      d.responsable?.toLowerCase().includes(searchLower);

    const matchesId = externalDepartureId
      ? Number(d.id) === Number(externalDepartureId)
      : true;

    return matchesSearch && matchesId;
  });

  const totalPages = Math.ceil(filtered.length / limit);

  const currentData = filtered.slice(
    (page - 1) * limit,
    page * limit
  );

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-md p-4">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">

        <SearchBar search={search} setSearch={setSearch} />

        {!externalDepartureId && (
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
            Agregar Salida
          </button>
        )}

      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">

        <table className="w-full text-sm">

          <thead className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-800">

            <tr>
              <th className="border px-3 py-2 dark:border-gray-700">#</th>
              <th className="border px-3 py-2 dark:border-gray-700">Chofer</th>
              <th className="border px-3 py-2 dark:border-gray-700">Movilidad</th>
              <th className="border px-3 py-2 dark:border-gray-700">Responsable</th>
              <th className="border px-3 py-2 dark:border-gray-700">Operaciones</th>
            </tr>

          </thead>

          <tbody>
            {currentData.length > 0 ? (
              currentData.map((d, i) => (
                <DepartureAuthorizationRow
                  key={d.id}
                  departure={d}
                  index={i + 1}
                  onEdit={handleEdit}
                />
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500 dark:text-gray-400">
                  No hay registros
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center mt-4">
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>

      {/* CREATE MODAL */}
      {modalType === "add" && (
        <CreateDepartureAuthorizationForm
          isOpen={modalType === "add"}
          onClose={() => setModalType(null)}
          onSave={handleSaveCreate}
          choferes={choferes}
          vehiculos={vehicles}
        />
      )}

      {/* EDIT MODAL */}
      {editOpen && (
        <EditDepartureAuthorizationForm
          isOpen={editOpen}
          onClose={handleCloseEdit}
          onSave={handleSaveEdit}
          choferes={choferes}
          vehiculos={vehicles}
          initialData={selectedDeparture}
        />
      )}

    </div>
  );
}