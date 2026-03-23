import { useState, useEffect } from "react";
import DepartureAuthorizationRow from "./DepartureAuthorizationRow";

import SearchBar from "../Search/SearchBar";
import Pagination from "./Pagination";

import { FiPlus } from "react-icons/fi";

import { useDepartureAuthorizationStore } from "../../../zustand/useDepartureAuthorizationStore";
import { useUserStore } from "../../../zustand/userStore";
import { useVehicleStore } from "../../../zustand/useVehicleStore";

export default function DepartureAuthorizationTable({ externalDepartureId = null }) {

  const { departures, fetchDepartures } = useDepartureAuthorizationStore();
  const { users, fetchUsers } = useUserStore();
  const { vehicles, fetchVehicles } = useVehicleStore();

  const choferes = users.filter(u => u.tipo === "chofer");
  const responsables = users.filter(u => u.tipo === "responsable");

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [modalType, setModalType] = useState(null);
  const [selectedDeparture, setSelectedDeparture] = useState(null);

  const limit = 8;

  useEffect(() => {
    fetchDepartures();
    fetchUsers();
    fetchVehicles();
  }, []);

  useEffect(() => setPage(1), [search]);

  const handleOpenModal = (type, dep = null) => {
    setModalType(type);
    setSelectedDeparture(dep);
  };

  const handleCloseModal = () => {
    setModalType(null);
    setSelectedDeparture(null);
  };

  const filtered = departures.filter(d => {

    const matchesSearch =
      d.lugar?.toLowerCase().includes(search.toLowerCase()) ||
      d.motivo?.toLowerCase().includes(search.toLowerCase()) ||
      d.responsable?.toLowerCase().includes(search.toLowerCase());

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
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md p-4">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">

        {/* SEARCH */}
        <SearchBar search={search} setSearch={setSearch} />

        {/* BOTÓN */}
        {!externalDepartureId && (
          <button
            onClick={() => handleOpenModal("add")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            <FiPlus size={18} />
            Agregar Salida
          </button>
        )}

      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">

        <table className="w-full text-sm">

          <thead className="bg-gradient-to-r from-blue-50 to-blue-100">
            <tr>
              <th className="border px-3 py-2">#</th>
              <th className="border px-3 py-2">Chofer</th>
              <th className="border px-3 py-2">Movilidad</th>
              <th className="border px-3 py-2">Responsable</th>
              <th className="border px-3 py-2">Operaciones</th>
            </tr>
          </thead>

          <tbody>
            {currentData.length > 0 ? (
              currentData.map((d, i) => (
                <DepartureAuthorizationRow
                  key={d.id}
                  departure={d}
                  index={i + 1}
                  onOpen={handleOpenModal}
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

      {/* PAGINATION */}
      <div className="flex justify-center mt-4">
        <Pagination
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      </div>

    </div>
  );
}